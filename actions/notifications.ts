"use server";

import { connectDB } from "@/lib/db";
import { Notification } from "@/lib/models/Notification";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const { userId } = await auth();
  if (!userId) return [];

  await connectDB();
  const docs = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(10).lean();
  // Map _id to id so client components expecting `id` field work correctly
  return docs.map((n) => ({ ...n, id: n._id.toString() })) as any[];
}

export async function markAsRead(notificationId: string) {
  const { userId } = await auth();
  if (!userId) return;

  await connectDB();
  await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true }
  );

  revalidatePath("/");
}
