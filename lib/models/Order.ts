import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
  licenseTierId?: string;
}

export interface IOrder extends Document {
  userId: string;
  pricePaidInCents: number;
  isPaid: boolean;
  stripePaymentIntentId?: string;
  items: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true, index: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    licenseTierId: { type: String },
  },
  { _id: true }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true, index: true },
    pricePaidInCents: { type: Number, required: true },
    isPaid: { type: Boolean, default: false, index: true },
    stripePaymentIntentId: { type: String, unique: true, sparse: true },
    items: [OrderItemSchema],
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
