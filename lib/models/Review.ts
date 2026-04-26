import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  // Snapshot fields so review cards render without extra User lookups
  userName: string;
  userAvatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 2000 },
    userId: { type: String, required: true },
    productId: { type: String, required: true, index: true },
    userName: { type: String, required: true, default: 'Anonymous' },
    userAvatarUrl: { type: String },
  },
  { timestamps: true }
);

// One review per user per product
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
