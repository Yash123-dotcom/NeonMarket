import mongoose, { Schema, Document, Model } from 'mongoose';

export const PRODUCT_CATEGORIES = [
  '3D Models',
  'UI Kits',
  'Templates',
  'Scripts',
  'Audio',
  'Video',
  'Fonts',
  'Icons',
  'Other',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number; // in cents
  currency: 'usd';
  imagePath: string;
  filePath: string;
  category: ProductCategory;
  tags: string[];
  stock: number;
  isActive: boolean;
  userId: string; // Clerk user ID of the seller
  // Denormalized stats (updated on review creation / order completion)
  averageRating: number;
  reviewCount: number;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ['usd'], default: 'usd' },
    imagePath: { type: String, required: true },
    filePath: { type: String, required: true },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 10,
        message: 'A product can have at most 10 tags.',
      },
    },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    userId: { type: String, required: true, index: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    downloadCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Compound indexes for common query patterns
ProductSchema.index({ userId: 1, isActive: 1 });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
