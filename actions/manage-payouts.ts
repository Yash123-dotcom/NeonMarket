"use server";

import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getStripeDashboardLink() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // 1. Get the user's Stripe Account ID from the DB
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser || !dbUser.stripeConnectAccountId) {
    throw new Error("No seller account found. Please onboard first.");
  }

  // 2. Create a Login Link using the Stripe API
  // This link gives them one-time access to their express dashboard
  const loginLink = await stripe.accounts.createLoginLink(
    dbUser.stripeConnectAccountId
  );

  return { url: loginLink.url };
}
