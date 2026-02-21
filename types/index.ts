import { z } from "zod";

// -----------------------------------------------------------------------------
// GLOBAL API RESPONSE TYPE
// -----------------------------------------------------------------------------
export type ActionResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

// -----------------------------------------------------------------------------
// ZOD SCHEMAS (Validation)
// -----------------------------------------------------------------------------

// User
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// Product
export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(100, "Price must be at least $1.00"), // Stored in cents
  imagePath: z.string().url(),
  filePath: z.string().url(),
  stock: z.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
});

// Coupon
export const couponSchema = z.object({
  code: z.string().min(3).max(20).regex(/^[A-Z0-9]+$/, "Code must be alphanumeric and uppercase"),
  percentOff: z.number().min(1).max(100),
});

// License Tier
export const licenseTierSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(0),
});

// Review
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(2),
  productId: z.string().uuid(),
});

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS (Frontend Usage)
// -----------------------------------------------------------------------------

// Product with Relations (Commonly used in dashboards/grids)
export type ProductWithRelations = {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  filePath: string;
  stock: number;
  isActive: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: { name?: string; email?: string };
  reviews?: any[];
  _count?: { reviews?: number; orderItems?: number };
};

export type OrderWithItems = {
  id: string;
  userId: string;
  pricePaidInCents: number;
  isPaid: boolean;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id?: string;
    productId: string;
    quantity: number;
    price: number;
    product?: ProductWithRelations;
  }[];
};

// Coupon (Simple type)
export type CouponWithUsage = any;
