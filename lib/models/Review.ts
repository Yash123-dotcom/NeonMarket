import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  user?: { name?: string };
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
