"use server";

import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { redirect } from "next/navigation";

export async function getStripeDashboardLink() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  await connectDB();

  const dbUser = await User.findById(user.id).lean();

  if (!dbUser || !dbUser.stripeConnectAccountId) {
    throw new Error("No seller account found. Please onboard first.");
  }

  const loginLink = await stripe.accounts.createLoginLink(dbUser.stripeConnectAccountId);
  return { url: loginLink.url };
}
