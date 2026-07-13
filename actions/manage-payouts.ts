"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function getStripeDashboardLink() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  await connectDB();

  const dbUser = await User.findById(user.id).lean();

  if (!dbUser || !dbUser.razorpayAccountId) {
    throw new Error("No seller account found. Please onboard first.");
  }

  // Redirect to Razorpay Dashboard
  return { url: "https://dashboard.razorpay.com" };
}
