import { connectDB } from "@/lib/db";
import { Coupon } from "@/lib/models/Coupon";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CouponsManager from "@/components/CouponsManager";

export default async function CouponsPageWrapper() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  await connectDB();
  const coupons = await Coupon.find({ userId }).sort({ createdAt: -1 }).lean();

  const plainCoupons = coupons.map((c) => ({ ...c, id: c._id.toString() }));

  return <CouponsManager coupons={plainCoupons} />;
}
