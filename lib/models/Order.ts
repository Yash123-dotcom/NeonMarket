import mongoose, { Schema, Document, Model } from 'mongoose';

export type OrderStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number; // unit price in cents at time of purchase
  licenseTierId?: string;
}

export interface IOrder extends Document {
  userId: string;
  status: OrderStatus;
  pricePaidInCents: number;
  couponCode?: string;
  /** @deprecated Use status === 'paid' instead */
  isPaid: boolean;
  stripePaymentIntentId?: string;
  items: IOrderItem[];
  downloadLinks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true, index: true },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true, min: 0 },
    licenseTierId: { type: String },
  },
  { _id: true }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'failed'] satisfies OrderStatus[],
      default: 'pending',
      index: true,
    },
    pricePaidInCents: { type: Number, required: true, min: 0 },
    couponCode: { type: String },
    isPaid: { type: Boolean, default: false },
    stripePaymentIntentId: { type: String, unique: true, sparse: true },
    items: [OrderItemSchema],
    downloadLinks: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Keep isPaid in sync with status
OrderSchema.pre('save', async function () {
  this.isPaid = this.status === 'paid';
});

OrderSchema.index({ userId: 1, status: 1 });

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
