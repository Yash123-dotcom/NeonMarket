"use server";

import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
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

  let accountId = existingUser!.stripeConnectAccountId;

  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.emailAddresses[0].emailAddress,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: { userId: user.id },
    });

    accountId = account.id;

    // Mark user as seller and save Stripe account ID
    await User.findByIdAndUpdate(user.id, { stripeConnectAccountId: accountId, isSeller: true });
  } else {
    // Ensure isSeller is true even if they had an account before
    await User.findByIdAndUpdate(user.id, { isSeller: true });
  }

  const accountLink = await stripe.accountLinks.create({
    account: accountId!,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/sell`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
}