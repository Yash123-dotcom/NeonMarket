"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(1), // Price in cents
  imagePath: z.string().url(),
  filePath: z.string().url(),
});

export async function createProduct(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    imagePath: formData.get("imagePath"),
    filePath: formData.get("filePath"),
  };

  const validatedData = productSchema.parse(rawData);

  // Price is input as dollars, convert to cents
  const priceInCents = Math.round(validatedData.price * 100);

  await prisma.product.create({
    data: {
      ...validatedData,
      price: priceInCents,
      userId,
      isActive: true, // Default to active
    },
  });

  revalidatePath("/products");
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
