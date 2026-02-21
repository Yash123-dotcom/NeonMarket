"use server";

import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { currentUser } from "@clerk/nextjs/server";

export async function createOrder(sessionId: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized: You must be logged in.");

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    throw new Error("Payment not verified or pending.");
  }

  await connectDB();

  // Idempotency check
  const existingOrder = await Order.findOne({ stripePaymentIntentId: session.payment_intent as string }).lean();
  if (existingOrder) {
    return { success: true, orderId: (existingOrder as any)._id.toString() };
  }

  const productIdsString = session.metadata?.productIds;
  if (!productIdsString) {
    console.error("CRITICAL: No product IDs found in Stripe metadata.");
    throw new Error("Order data is missing. Please contact support.");
  }

  const productIds: string[] = JSON.parse(productIdsString);

  const order = await Order.create({
    userId: user.id,
    pricePaidInCents: session.amount_total || 0,
    stripePaymentIntentId: session.payment_intent as string,
    isPaid: true,
    items: productIds.map((pid) => ({
      productId: pid,
      quantity: 1,
      price: 0,
    })),
  });

  return { success: true, orderId: order._id.toString() };
}