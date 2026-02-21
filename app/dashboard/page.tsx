import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { Download, Package } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ManagePayouts from "@/components/ManagePayouts";
import { getDashboardAnalytics } from "@/lib/analytics";
import { BentoGrid } from "@/components/Dashboard/BentoGrid";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  await connectDB();

  const user = await User.findById(userId).lean();

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

  let analyticsData = null;
  if (user?.isSeller || user?.stripeConnectAccountId) {
    analyticsData = await getDashboardAnalytics(userId);
  }

  return (
    <main className="min-h-screen bg-background text-white pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="bg-blue-600 w-2 h-8 rounded-full"></span>
              Seller Dashboard
            </h2>
            {user?.stripeConnectAccountId ? (
              <div className="flex gap-4">
                <Link href="/dashboard/products" className="bg-zinc-900 text-white font-bold px-5 py-2 rounded-lg hover:bg-zinc-800 transition border border-white/10">
                  My Products
                </Link>
                <Link href="/dashboard/coupons" className="bg-blue-900/20 text-blue-400 font-bold px-5 py-2 rounded-lg hover:bg-blue-900/30 transition border border-blue-500/20">
                  Coupons
                </Link>
                <ManagePayouts />
              </div>
            ) : (
              <Link href="/sell" className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition">
                Become a Seller
              </Link>
            )}
          </div>

          {user?.stripeConnectAccountId && analyticsData ? (
            <div className="space-y-6">
              <BentoGrid totalRevenue={analyticsData.totalRevenue} totalSales={analyticsData.totalSales} totalViews={analyticsData.totalViews} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
                <RevenueChart data={analyticsData.chartData} />
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-bold mb-4">Start your journey</h3>
              <p className="text-zinc-400 max-w-lg mx-auto mb-8">
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
          <p className="text-zinc-400 mb-8 ml-5">Access your purchased assets universally.</p>

          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
              <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
              <p className="text-zinc-500 mb-6">Your collection is empty.</p>
              <Link href="/products" className="text-blue-400 hover:text-blue-300 font-bold">
                Browse the Marketplace &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition">
                  <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
                    <span className="text-xs font-mono text-zinc-500">ORDER {order.id.slice(0, 8).toUpperCase()}</span>
                    <span className="text-sm font-bold text-emerald-400">PAID ${(order.pricePaidInCents / 100).toFixed(2)}</span>
                  </div>
                  <div className="p-6 grid gap-6">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product && <img src={item.product.imagePath} className="w-full h-full object-cover" alt="" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white">{item.product?.name || 'Product'}</h4>
                            <p className="text-sm text-zinc-500">Personal &amp; Commercial License</p>
                          </div>
                        </div>
                        <a
                          href={`/api/download/${item.productId}`}
                          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition text-sm w-full sm:w-auto justify-center"
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