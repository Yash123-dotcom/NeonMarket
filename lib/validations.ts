import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description too long'),
  price: z.number().min(1, 'Price must be at least $0.01').max(999999, 'Price too high'),
  imagePath: z
    .string()
    .url('Invalid image URL')
    .or(z.string().startsWith('/', 'Invalid image path')),
  filePath: z.string().min(1, 'File path is required'),
  stock: z.number().min(0, 'Stock cannot be negative').max(999999, 'Stock too high'),
});

export const OrderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  pricePaidInCents: z.number().min(1, 'Price must be positive'),
  productIds: z
    .array(z.string().uuid('Invalid product ID'))
    .min(1, 'At least one product required'),
});

export const UserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
});

export const ReviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment too long'),
  productId: z.string().uuid('Invalid product ID'),
  userId: z.string().min(1, 'User ID is required'),
});

export type ProductInput = z.infer<typeof ProductSchema>;
export type OrderInput = z.infer<typeof OrderSchema>;
export type UserInput = z.infer<typeof UserSchema>;
export type ReviewInput = z.infer<typeof ReviewSchema>;
