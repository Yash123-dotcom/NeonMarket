"use server";

import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Coupon } from "@/lib/models/Coupon";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { ActionResponse } from "@/types";

const checkoutSchema = z.object({
  productIds: z.array(z.string()),
  couponCode: z.string().optional(),
  licenseTierId: z.string().optional(),
});

type CheckoutInput = z.infer<typeof checkoutSchema>;

export async function createCheckoutSession(
  input: CheckoutInput
): Promise<ActionResponse<{ url: string }>> {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "Unauthorized", error: "User not logged in" };
    }

    const validated = checkoutSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, message: "Invalid Input", error: validated.error.message };
    }
    const { productIds, couponCode, licenseTierId } = validated.data;
    const origin = (await headers()).get("origin") || "http://localhost:3000";

    await connectDB();

    // Fetch Products
    const products = await Product.find({ _id: { $in: productIds }, isActive: true }).lean();

    if (products.length === 0) {
      return { success: false, message: "No valid products found." };
    }

    // For MVP, get seller from first product's userId
    const { User } = await import("@/lib/models/User");
    const seller = await User.findById(products[0].userId).lean();

    if (!seller?.stripeConnectAccountId) {
      return { success: false, message: "Seller payout setup incomplete." };
    }

    // Coupon Logic
    let discountPercent = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true, userId: seller._id }).lean();
      if (coupon) discountPercent = coupon.percentOff;
    }

    // Build Line Items
    let totalAmount = 0;
    const line_items: any[] = [];

    for (const product of products) {
      const discountedPrice = Math.round(product.price * (1 - discountPercent / 100));
      totalAmount += discountedPrice;
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.imagePath],
            description: product.description.substring(0, 100),
          },
          unit_amount: discountedPrice,
        },
        quantity: 1,
      });
    }

    const platformFee = Math.round(totalAmount * 0.10);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_email: user.emailAddresses[0].emailAddress,
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: { destination: seller.stripeConnectAccountId },
      },
      metadata: {
        userId: user.id,
        productIds: JSON.stringify(productIds),
        couponCode: couponCode || "",
        licenseTierId: licenseTierId || "",
      },
    });

    if (!session.url) throw new Error("Failed to create session URL");
    return { success: true, message: "Checkout initialized", data: { url: session.url } };

  } catch (error) {
    console.error("Checkout Error:", error);
    return { success: false, message: "Internal Server Error", error: String(error) };
  }
}
