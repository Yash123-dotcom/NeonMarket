import mongoose, { Schema, Model } from 'mongoose';

export type UserRole = 'buyer' | 'seller' | 'admin';

// User _id is a Clerk User ID (string), not a MongoDB ObjectId.
export type IUser = {
  _id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  isSeller: boolean;
  payoutEnabled: boolean;
  stripeConnectAccountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const UserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    avatarUrl: { type: String },
    bio: { type: String, maxlength: 500 },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'] satisfies UserRole[],
      default: 'buyer',
    },
    isSeller: { type: Boolean, default: false },
    payoutEnabled: { type: Boolean, default: false },
    stripeConnectAccountId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
