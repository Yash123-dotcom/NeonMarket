import mongoose, { Schema, Model } from 'mongoose';

// User _id is a Clerk User ID (string), not a MongoDB ObjectId.
// We extend Record so Mongoose doesn't conflict on _id typing.
export type IUser = {
  _id: string;
  email: string;
  name?: string;
  stripeConnectAccountId?: string;
  isSeller: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const UserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String },
    stripeConnectAccountId: { type: String, unique: true, sparse: true },
    isSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
