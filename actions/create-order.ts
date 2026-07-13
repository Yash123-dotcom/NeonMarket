"use server";

import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { currentUser } from "@clerk/nextjs/server";

export async function createOrder(orderId: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized: You must be logged in.");

  await connectDB();

  // Idempotency / Webhook check: Find order by Razorpay Order ID
  const existingOrder = await Order.findOne({ razorpayOrderId: orderId }).lean();
  if (existingOrder) {
    return { success: true, orderId: (existingOrder as any)._id.toString() };
  }

  // If the webhook hasn't processed it yet, return a pending state
  return { success: true, pending: true };
}