import mongoose, { Schema, Document, Model } from 'mongoose';

export type NotificationType = 'PURCHASE' | 'SALE' | 'REFUND' | 'SYSTEM' | 'REVIEW';

export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: NotificationType;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false, index: true },
    type: {
      type: String,
      enum: ['PURCHASE', 'SALE', 'REFUND', 'SYSTEM', 'REVIEW'] satisfies NotificationType[],
      required: true,
    },
    link: { type: String },
  },
  { timestamps: true }
);

// Auto-delete notifications after 90 days
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });
// Fast lookup: user's unread notifications
NotificationSchema.index({ userId: 1, isRead: 1 });

export const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
