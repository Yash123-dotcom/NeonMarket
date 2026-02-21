'use server';

import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProductSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';

export async function editProduct(id: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  await connectDB();

  const existingProduct = await Product.findById(id).lean();
  if (!existingProduct || existingProduct.userId !== userId) {
    throw new Error('Product not found or unauthorized');
  }

  const rawData = {
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    imagePath: formData.get('imagePath') as string,
    filePath: formData.get('filePath') as string,
    stock: Number(formData.get('stock')) || 999,
  };

  const validatedData = ProductSchema.parse(rawData);

  await Product.findByIdAndUpdate(id, {
    ...validatedData,
    price: validatedData.price * 100,
  });

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/product/${id}`);
  redirect('/admin/products');
}
