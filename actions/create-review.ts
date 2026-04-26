'use server';

import { connectDB } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Review } from '@/lib/models/Review';
import { revalidatePath } from 'next/cache';
import { ReviewSchema } from '@/lib/validations';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Product } from '@/lib/models/Product';

export async function createReview(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('You must be logged in to leave a review');

  const user = await currentUser();

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

  const userName =
    user
      ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.emailAddresses[0]?.emailAddress || 'Anonymous'
      : 'Anonymous';

  await Review.create({
    ...validatedData,
    userName,
    userAvatarUrl: user?.imageUrl,
  });

  // Update denormalized product stats
  const reviews = await Review.find({ productId: validatedData.productId }).select('rating').lean();
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0;

  await Product.findByIdAndUpdate(validatedData.productId, {
    reviewCount,
    averageRating: Math.round(averageRating * 10) / 10,
  });

  revalidatePath(`/product/${validatedData.productId}`);

  return { success: true };
}
