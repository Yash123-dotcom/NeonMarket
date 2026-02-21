import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalytics extends Document {
  date: Date;
  revenue: number;
  sales: number;
  views: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    date: { type: Date, required: true },
    revenue: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

AnalyticsSchema.index({ date: 1, userId: 1 }, { unique: true });

export const Analytics: Model<IAnalytics> =
  mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
