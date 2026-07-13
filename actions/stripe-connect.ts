"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { redirect } from "next/navigation";

export async function createSellerAccount() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  await connectDB();

  let existingUser = await User.findById(user.id).lean();

  // Fallback: create user in DB if webhook missed them
  if (!existingUser) {
    console.log("User not found in DB. Creating fallback user...");
    existingUser = await User.findByIdAndUpdate(
      user.id,
      {
        _id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName || ""}`.trim() || "Seller",
      },
      { upsert: true, new: true }
    );
  }

  let accountId = existingUser!.razorpayAccountId;

  if (!accountId) {
    // Generate a mock Razorpay Account ID for Route payouts
    accountId = `acc_${Math.random().toString(36).substring(2, 12)}`;

    // Mark user as seller and save Razorpay account ID
    await User.findByIdAndUpdate(user.id, { 
      razorpayAccountId: accountId, 
      isSeller: true,
      payoutEnabled: true 
    });
  } else {
    // Ensure isSeller is true
    await User.findByIdAndUpdate(user.id, { isSeller: true });
  }

  return redirect("/dashboard");
}