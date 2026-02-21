"use server";

import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(1),
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
  const priceInCents = Math.round(validatedData.price * 100);

  await connectDB();

  await Product.create({
    ...validatedData,
    price: priceInCents,
    userId,
    isActive: true,
    stock: 999,
  });

  revalidatePath("/products");
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
