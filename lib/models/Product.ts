import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number; // in cents
  imagePath: string;
  filePath: string;
  stock: number;
  isActive: boolean;
  userId: string; // Clerk user ID of the seller
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imagePath: { type: String, required: true },
    filePath: { type: String, required: true },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
