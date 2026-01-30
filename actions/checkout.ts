"use server";

import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { ActionResponse } from "@/types";

// Schema for the action input
const checkoutSchema = z.object({
  productIds: z.array(z.string()),
  couponCode: z.string().optional(),
  licenseTierId: z.string().optional(), // For Phase 2
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

    // 1. Validate Input
    const validated = checkoutSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, message: "Invalid Input", error: validated.error.message };
    }
    const { productIds, couponCode, licenseTierId } = validated.data;

    const origin = (await headers()).get("origin") || "http://localhost:3000";

    // 2. Fetch Products
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
      include: { user: true }, // Get seller
    });

    if (products.length === 0) {
      return { success: false, message: "No valid products found." };
    }

    // MVP Limitation: Single Seller per Cart
    const seller = products[0].user;
    if (!seller.stripeConnectAccountId) {
      return { success: false, message: "Seller payout setup incomplete." };
    }

    // 3. Coupon Logic
    let discountPercent = 0;
    if (couponCode) {
        const coupon = await prisma.coupon.findUnique({
            where: { code: couponCode, isActive: true, userId: seller.id }
        });
        if (coupon) discountPercent = coupon.percentOff;
    }

    // 4. Construct Line Items
    let totalAmount = 0;
    const line_items = [];

    for (const product of products) {
        // If we had license tiers, we'd fetch the specific price.
        // For now, use base price.
        let price = product.price;
        
        // Apply discount
        const discountedPrice = Math.round(price * (1 - discountPercent / 100));
        totalAmount += discountedPrice;

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [`${origin}${product.imagePath}`], // Ensure absolute URL
                    description: product.description.substring(0, 100),
                },
                unit_amount: discountedPrice,
            },
            quantity: 1,
        });
    }

    // 5. Create Session
    const platformFee = Math.round(totalAmount * 0.10); // 10% Fee

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_email: user.emailAddresses[0].emailAddress,
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: seller.stripeConnectAccountId,
        },
      },
      metadata: {
        userId: user.id,
        // Store simple array for webhook to parse
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
