'use server';

import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProductSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';

export async function editProduct(id: string, formData: FormData) {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Check if user owns this product
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct || existingProduct.userId !== userId) {
    throw new Error('Product not found or unauthorized');
  }

  // Extract and validate data
  const rawData = {
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    imagePath: formData.get('imagePath') as string,
    filePath: formData.get('filePath') as string,
    stock: Number(formData.get('stock')) || 999,
  };

  // Validate with Zod
  const validatedData = ProductSchema.parse(rawData);

  await prisma.product.update({
    where: { id },
    data: {
      ...validatedData,
      price: validatedData.price * 100, // Convert to cents
    },
  });

  // Refresh data across the site
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/product/${id}`);

  redirect('/admin/products');
}
