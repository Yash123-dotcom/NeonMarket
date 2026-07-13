import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { auth, currentUser } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { Download, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import ManagePayouts from "@/components/ManagePayouts";
import { getDashboardAnalytics } from "@/lib/analytics";
import { BentoGrid } from "@/components/Dashboard/BentoGrid";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  await connectDB();

  let user = await User.findById(userId).lean();

  // Sync user from Clerk if missing in MongoDB (e.g. if webhook wasn't triggered)
  if (!user) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const email = clerkUser.emailAddresses[0]?.emailAddress || "";
      const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User";
      
      const createdUser = await User.create({
        _id: userId,
        email,
        name,
        isSeller: false
      });
      user = JSON.parse(JSON.stringify(createdUser));
    }
  }

  // Get orders with populated product info
  const rawOrders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

  // Manually attach product info to each order item
  const allProductIds = rawOrders.flatMap((o) => o.items.map((i) => i.productId));
  const productsMap: Record<string, any> = {};
  const productDocs = await Product.find({ _id: { $in: allProductIds } }).lean();
  for (const p of productDocs) {
    productsMap[p._id.toString()] = p;
  }

  const orders = rawOrders.map((order) => ({
    ...order,
    id: order._id.toString(),
    items: order.items.map((item, idx) => ({
      ...item,
      id: `${order._id.toString()}-${idx}`,
      product: productsMap[item.productId] || null,
    })),
  }));

  const isSeller = user?.isSeller || !!user?.razorpayAccountId;
  let analyticsData = null;
  if (isSeller) {
    analyticsData = await getDashboardAnalytics(userId);
  }

  return (
    <main className="min-h-screen bg-background text-white pb-20 relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-40 space-y-16 relative z-10">
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="bg-blue-500 w-2 h-8 rounded-full"></span>
              Seller Dashboard
            </h2>
            {user?.razorpayAccountId ? (
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/products" className="bg-white/5 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/10 transition border border-white/10 text-sm">
                  My Products
                </Link>
                <Link href="/dashboard/coupons" className="bg-blue-950/40 text-blue-400 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-900/20 transition border border-blue-500/20 text-sm">
                  Coupons
                </Link>
                <ManagePayouts />
              </div>
            ) : isSeller ? (
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/products" className="bg-white/5 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/10 transition border border-white/10 text-sm">
                  My Products
                </Link>
                <Link href="/sell" className="bg-yellow-500/10 text-yellow-400 font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-500/20 transition border border-yellow-500/20 text-sm">
                  Complete Payout Setup
                </Link>
              </div>
            ) : (
              <Link href="/sell" className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition text-sm">
                Become a Seller
              </Link>
            )}
          </div>

          {isSeller && analyticsData ? (
            <div className="space-y-6">
              {!user?.razorpayAccountId && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <p className="font-bold text-sm">Payout setup incomplete</p>
                    <p className="text-xs text-yellow-400/70">Your products are live, but you need to connect your account to receive payments. <Link href="/sell" className="underline font-bold">Complete setup →</Link></p>
                  </div>
                </div>
              )}
              <BentoGrid totalRevenue={analyticsData.totalRevenue} totalSales={analyticsData.totalSales} totalViews={analyticsData.totalViews} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
                <RevenueChart data={analyticsData.chartData} />
              </div>
            </div>
          ) : (
            <div className="glass-premium rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-bold mb-4">Start your journey</h3>
              <p className="text-zinc-400 max-w-lg mx-auto mb-8 font-normal">
                Become a seller on NeonMarket to access advanced analytics, manage your products, and earn revenue.
              </p>
            </div>
          )}
        </section>

        <section>
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <span className="bg-cyan-500 w-2 h-8 rounded-full"></span>
            My Library
          </h1>
          <p className="text-zinc-400 mb-8 ml-5 font-normal">Access your purchased assets universally.</p>

          {orders.length === 0 ? (
            <div className="text-center py-20 glass-premium rounded-3xl border-dashed">
              <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
              <p className="text-zinc-500 mb-6 font-normal">Your collection is empty.</p>
              <Link href="/products" className="text-blue-400 hover:text-blue-300 font-bold">
                Browse the Marketplace &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div key={order.id} className="glass-premium rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
                    <span className="text-xs font-mono text-zinc-500">ORDER {order.id.slice(0, 8).toUpperCase()}</span>
                    <span className="text-sm font-bold text-emerald-400">PAID ${(order.pricePaidInCents / 100).toFixed(2)}</span>
                  </div>
                  <div className="p-6 grid gap-6">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product && <Image src={item.product.imagePath} width={80} height={80} className="w-full h-full object-cover" alt="" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white">{item.product?.name || 'Product'}</h4>
                            <p className="text-sm text-zinc-500 font-normal">Personal &amp; Commercial License</p>
                          </div>
                        </div>
                        <a
                          href={`/api/download/${item.productId}`}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-bold hover:scale-[1.02] transform transition-all text-sm w-full sm:w-auto justify-center"
                        >
                          <Download className="w-4 h-4" />
                          Download Asset
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}