import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { Notification } from "@/lib/models/Notification";
import { Analytics } from "@/lib/models/Analytics";

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  // Verify Signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(bodyText)
    .digest("hex");

  if (expectedSignature !== signature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(bodyText);

  try {
    if (event.event === "order.paid") {
      const orderData = event.payload.order.entity;
      const paymentData = event.payload.payment.entity;

      const razorpayOrderId = orderData.id;
      const razorpayPaymentId = paymentData.id;
      const amountPaid = orderData.amount_paid;

      // Parse metadata passed from checkout
      const metadata = orderData.notes;
      if (!metadata || !metadata.userId || !metadata.productIds) {
        throw new Error("Missing metadata in order notes");
      }

      const userId = metadata.userId;
      const productIds: string[] = JSON.parse(metadata.productIds);
      const couponCode = metadata.couponCode;

      await connectDB();

      // Idempotency check
      const existingOrder = await Order.findOne({ razorpayOrderId }).lean();
      if (existingOrder) {
        console.log("Order already exists:", (existingOrder as any)._id);
        return new NextResponse("Webhook processed", { status: 200 });
      }

      const products = await Product.find({ _id: { $in: productIds } }).lean();

      // Notifications & Analytics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sellerIds = [...new Set(products.map((p) => p.userId))];

      for (const sellerId of sellerIds) {
        const sellerProducts = products.filter((p) => p.userId === sellerId);
        const sellerRevenue = sellerProducts.reduce((acc, p) => acc + p.price, 0);

        await Notification.create({
          userId: sellerId,
          title: "Cha-ching! New Sale",
          message: "You just sold digital assets. Check your dashboard.",
          type: "SALE",
          link: "/dashboard",
        });

        await Analytics.findOneAndUpdate(
          { date: today, userId: sellerId },
          {
            $inc: { revenue: sellerRevenue, sales: sellerProducts.length },
            $push: {
              productBreakdown: {
                $each: sellerProducts.map((p) => ({
                  productId: p._id.toString(),
                  revenue: p.price,
                  sales: 1,
                })),
              },
            },
          },
          { upsert: true, new: true }
        );
      }

      await Notification.create({
        userId,
        title: "Order Confirmed!",
        message: `Your purchase of ${products.length} item(s) was successful.`,
        type: "PURCHASE",
        link: "/dashboard",
      });

      // Create Order
      const order = await Order.create({
        userId,
        status: "paid",
        pricePaidInCents: amountPaid,
        razorpayOrderId,
        razorpayPaymentId,
        isPaid: true,
        couponCode,
        items: products.map((product) => ({
          productId: product._id.toString(),
          quantity: 1,
          price: product.price,
        })),
      });

      // Update Stock & Downloads
      for (const product of products) {
        await Product.findByIdAndUpdate(product._id, {
          $inc: { stock: -1, downloadCount: 1 },
        });
      }

      console.log("Order created:", order._id);
    } else {
      console.log(`Unhandled event type: ${event.event}`);
    }

    return new NextResponse("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook processing failed", { status: 500 });
  }
}
