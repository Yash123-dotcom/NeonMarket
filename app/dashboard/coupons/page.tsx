import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CouponsManager from "@/components/CouponsManager";

export default async function CouponsPageWrapper() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  // @ts-ignore
  const coupons = await prisma.coupon.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return <CouponsManager coupons={coupons} />;
}
