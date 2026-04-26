import mongoose, { Schema, Document, Model } from 'mongoose';

export type DiscountType = 'percent' | 'fixed';

export interface ICoupon extends Document {
  code: string;
  discountType: DiscountType;
  percentOff: number;   // used when discountType === 'percent'
  fixedOff: number;     // cents off, used when discountType === 'fixed'
  isActive: boolean;
  userId: string;       // seller who owns this coupon
  expiresAt?: Date;
  maxUses?: number;     // null = unlimited
  usedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, index: true, uppercase: true, trim: true },
    discountType: {
      type: String,
      enum: ['percent', 'fixed'] satisfies DiscountType[],
      default: 'percent',
    },
    percentOff: { type: Number, default: 0, min: 0, max: 100 },
    fixedOff: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    userId: { type: String, required: true, index: true },
    expiresAt: { type: Date },
    maxUses: { type: Number, default: null },
    usedCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Guard: don't let usedCount exceed maxUses
CouponSchema.pre('save', async function () {
  if (this.maxUses != null && this.usedCount > this.maxUses) {
    throw new Error(`Coupon "${this.code}" has reached its usage limit.`);
  }
});

export const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
