import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductBreakdown {
  productId: string;
  revenue: number;  // in cents
  sales: number;
}

export interface IAnalytics extends Document {
  date: Date;        // midnight UTC for the day this record represents
  userId: string;    // seller
  revenue: number;   // total in cents for the day
  sales: number;     // total orders for the day
  views: number;     // total product page views for the day
  productBreakdown: IProductBreakdown[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductBreakdownSchema = new Schema<IProductBreakdown>(
  {
    productId: { type: String, required: true },
    revenue: { type: Number, default: 0, min: 0 },
    sales: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    date: { type: Date, required: true },
    userId: { type: String, required: true, index: true },
    revenue: { type: Number, default: 0, min: 0 },
    sales: { type: Number, default: 0, min: 0 },
    views: { type: Number, default: 0, min: 0 },
    productBreakdown: { type: [ProductBreakdownSchema], default: [] },
  },
  { timestamps: true }
);

// One record per seller per day
AnalyticsSchema.index({ date: 1, userId: 1 }, { unique: true });

export const Analytics: Model<IAnalytics> =
  mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
