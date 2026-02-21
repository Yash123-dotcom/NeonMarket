"use server";

import { connectDB } from "@/lib/db";
import { Coupon } from "@/lib/models/Coupon";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const couponSchema = z.object({
  code: z.string().min(3).max(20).regex(/^[A-Z0-9]+$/, "Code must be uppercase alphanumeric"),
  percentOff: z.coerce.number().min(1).max(100),
});

export async function createCoupon(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rawData = {
    code: formData.get("code")?.toString().toUpperCase(),
    percentOff: formData.get("percentOff"),
  };

  const validatedData = couponSchema.parse(rawData);

  await connectDB();

  const existing = await Coupon.findOne({ code: validatedData.code }).lean();
  if (existing) throw new Error("Coupon code already exists");

  await Coupon.create({ ...validatedData, userId });

  revalidatePath("/dashboard/coupons");
}

export async function deleteCoupon(couponId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await connectDB();
  await Coupon.findOneAndDelete({ _id: couponId, userId });

  revalidatePath("/dashboard/coupons");
}
