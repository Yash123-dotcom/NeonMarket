"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const { userId } = await auth();
  if (!userId) return [];

  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export async function markAsRead(notificationId: string) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.notification.update({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
  
  revalidatePath("/");
}
