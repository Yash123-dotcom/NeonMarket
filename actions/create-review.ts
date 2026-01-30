'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ReviewSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';

export async function createReview(formData: FormData) {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    throw new Error('You must be logged in to leave a review');
  }

  // Extract data
  const rawData = {
    rating: Number(formData.get('rating')),
    comment: formData.get('comment') as string,
    productId: formData.get('productId') as string,
    userId: userId,
  };

  // Validate with Zod
  const validatedData = ReviewSchema.parse(rawData);

  // Check if user has purchased this product
  const hasPurchased = await prisma.order.findFirst({
    where: {
      userId: userId,
      isPaid: true,
      items: {
        some: {
          productId: validatedData.productId,
        },
      },
    },
  });

  if (!hasPurchased) {
    throw new Error('You can only review products you have purchased');
  }

  // Check if user already reviewed this product
  const existingReview = await prisma.review.findUnique({
    where: {
      userId_productId: {
        userId: userId,
        productId: validatedData.productId,
      },
    },
  });

  if (existingReview) {
    throw new Error('You have already reviewed this product');
  }

  // Create the review
  await prisma.review.create({
    data: validatedData,
  });

  // Refresh the product page
  revalidatePath(`/product/${validatedData.productId}`);

  return { success: true };
}
