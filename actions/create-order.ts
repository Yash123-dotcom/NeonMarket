"use server";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function createOrder(sessionId: string) {
  // 1. Check if user is logged in
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized: You must be logged in.");
  }

  // 2. Verify payment with Stripe
  // We retrieve the session directly from Stripe to ensure the payment is real.
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("Payment not verified or pending.");
  }

  // 3. Prevent Duplicate Orders (Idempotency)
  // If the user refreshes the Success page, we check if this payment ID was already saved.
  const existingOrder = await prisma.order.findUnique({
    where: { stripePaymentIntentId: session.payment_intent as string },
  });

  if (existingOrder) {
    return { success: true, orderId: existingOrder.id };
  }

  // 4. Retrieve Product IDs from Metadata
  // We saved this list inside 'createCheckoutSession' so we know what they bought.
  const productIdsString = session.metadata?.productIds;
  
  if (!productIdsString) {
    console.error("CRITICAL: No product IDs found in Stripe metadata.");
    throw new Error("Order data is missing. Please contact support.");
  }

  const productIds = JSON.parse(productIdsString);

  // 5. Create the Order in the Database
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      pricePaidInCents: session.amount_total || 0,
      stripePaymentIntentId: session.payment_intent as string,
      
      // This creates the link between the Order and the Products (OrderItems)
      items: {
        create: productIds.map((pid: string) => ({
          productId: pid,
          quantity: 1,
          price: 0, // Snapshot of price (optional)
        })),
      },
    },
  });

  return { success: true, orderId: order.id };
}