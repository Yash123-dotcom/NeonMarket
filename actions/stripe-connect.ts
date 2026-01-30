"use server";

import { currentUser } from "@clerk/nextjs/server"; // <--- CHANGED THIS IMPORT
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createSellerAccount() {
  const user = await currentUser(); // <--- CHANGED THIS CALL

  if (!user) {
    return redirect("/sign-in");
  }

  // 1. Check if user exists in our DB
  let existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  // 2. Fallback: If not in DB (Webhook failed or latency), create them now.
  if (!existingUser) {
    console.log("User not found in DB. Creating fallback user...");
    const email = user.emailAddresses[0].emailAddress;
    const name = `${user.firstName} ${user.lastName || ""}`.trim();
    
    existingUser = await prisma.user.create({
      data: {
        id: user.id,
        email: email, 
        name: name || "Seller",
      },
    });
  }

  let accountId = existingUser.stripeConnectAccountId;

  // 2. If no Stripe ID, Create one
  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: user.emailAddresses[0].emailAddress, // <--- Access email correctly from Clerk
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: {
        userId: user.id,
      },
    });

    accountId = account.id;

    // Save Stripe ID to Database
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeConnectAccountId: accountId },
    });
  }

  // 3. Create the Onboarding Link
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/sell`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    type: "account_onboarding",
  });

  // 4. Send them to Stripe
  return redirect(accountLink.url);
}