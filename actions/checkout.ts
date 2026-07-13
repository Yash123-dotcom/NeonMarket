"use server";

import { z } from "zod";
import { razorpay } from "@/lib/razorpay";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Coupon } from "@/lib/models/Coupon";
import { currentUser } from "@clerk/nextjs/server";
import { ActionResponse } from "@/types";

const checkoutSchema = z.object({
  productIds: z.array(z.string()),
  couponCode: z.string().optional(),
  licenseTierId: z.string().optional(),
});

type CheckoutInput = z.infer<typeof checkoutSchema>;

export async function createCheckoutSession(
  input: CheckoutInput
): Promise<ActionResponse<{ orderId: string; amount: number; currency: string }>> {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "Unauthorized", error: "User not logged in" };
    }

    const validated = checkoutSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, message: "Invalid Input", error: validated.error.message };
    }
    const { productIds, couponCode } = validated.data;

    await connectDB();

    // Fetch Products
    const products = await Product.find({ _id: { $in: productIds }, isActive: true }).lean();

    if (products.length === 0) {
      return { success: false, message: "No valid products found." };
    }

    // For MVP, get seller from first product's userId
    const { User } = await import("@/lib/models/User");
    const seller = await User.findById(products[0].userId).lean();

    if (!seller?.razorpayAccountId) {
      return { success: false, message: "Seller payout setup incomplete." };
    }

    // Coupon Logic
    let discountPercent = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true, userId: seller._id }).lean();
      if (coupon) discountPercent = coupon.percentOff;
    }

    // Calculate total
    let totalAmount = 0;
    for (const product of products) {
      const discountedPrice = Math.round(product.price * (1 - discountPercent / 100));
      totalAmount += discountedPrice;
    }

    // Platform takes 10%
    const platformFee = Math.round(totalAmount * 0.10);
    const sellerTransferAmount = totalAmount - platformFee;

    // Create Razorpay Order
    const orderOptions = {
      amount: totalAmount, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: user.id,
        productIds: JSON.stringify(productIds),
        couponCode: couponCode || "",
      },
      transfers: [
        {
          account: seller.razorpayAccountId,
          amount: sellerTransferAmount,
          currency: "INR",
          notes: {
            message: "Seller payout for digital assets",
          },
          on_hold: 0, 
        }
      ]
    };

    const razorpayOrder = await razorpay.orders.create(orderOptions);

    if (!razorpayOrder.id) throw new Error("Failed to create Razorpay Order");
    
    return { 
      success: true, 
      message: "Checkout initialized", 
      data: { 
        orderId: razorpayOrder.id, 
        amount: totalAmount, 
        currency: "INR" 
      } 
    };

  } catch (error) {
    console.error("Checkout Error:", error);
    return { success: false, message: "Internal Server Error", error: String(error) };
  }
}
