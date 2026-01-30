"use server";

import { prisma } from "@/lib/db";
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

  // Check if code exists globally (since codes must be unique in Stripe checkout logic typically)
  const existing = await prisma.coupon.findUnique({
    where: { code: validatedData.code },
  });

  if (existing) {
    throw new Error("Coupon code already exists");
  }

  await prisma.coupon.create({
    data: {
      ...validatedData,
      userId,
    },
  });

  revalidatePath("/dashboard/coupons");
}

export async function deleteCoupon(couponId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    await prisma.coupon.delete({
      where: { id: couponId, userId }, // Ensure ownership
    });
  
    revalidatePath("/dashboard/coupons");
}
