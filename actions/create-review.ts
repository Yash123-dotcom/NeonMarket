'use server';

import { connectDB } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Review } from '@/lib/models/Review';
import { revalidatePath } from 'next/cache';
import { ReviewSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';

export async function createReview(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('You must be logged in to leave a review');

  const rawData = {
    rating: Number(formData.get('rating')),
    comment: formData.get('comment') as string,
    productId: formData.get('productId') as string,
    userId,
  };

  const validatedData = ReviewSchema.parse(rawData);

  await connectDB();

  // Check if user purchased this product
  const hasPurchased = await Order.findOne({
    userId,
    isPaid: true,
    'items.productId': validatedData.productId,
  }).lean();

  if (!hasPurchased) {
    throw new Error('You can only review products you have purchased');
  }

  // Check for existing review
  const existingReview = await Review.findOne({
    userId,
    productId: validatedData.productId,
  }).lean();

  if (existingReview) {
    throw new Error('You have already reviewed this product');
  }

  await Review.create(validatedData);
  revalidatePath(`/product/${validatedData.productId}`);

  return { success: true };
}
