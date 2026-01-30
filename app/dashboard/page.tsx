import { prisma } from "@/lib/db";
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

  // 1. Find the user to check Stripe status
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // 2. Find all orders for this user
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  
  // 3. Get Analytics (for Sellers)
  let analyticsData = null;
  if(user?.isSeller || user?.stripeConnectAccountId) {
      analyticsData = await getDashboardAnalytics(userId);
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-12">
        
        {/* SELLER DASHBOARD SECTION */}
        <section>
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    <span className="bg-purple-600 w-2 h-8 rounded-full"></span>
                    Seller Dashboard
                 </h2>
                 
                 {user?.stripeConnectAccountId ? (
                    <div className="flex gap-4">
                        <Link 
                            href="/dashboard/products"
                            className="bg-zinc-900 text-white font-bold px-5 py-2 rounded-lg hover:bg-zinc-800 transition border border-zinc-800"
                        >
                            My Products
                        </Link>
                         <Link 
                            href="/dashboard/coupons"
                            className="bg-purple-900/20 text-purple-400 font-bold px-5 py-2 rounded-lg hover:bg-purple-900/30 transition border border-purple-500/20"
                        >
                            Coupons
                        </Link>
                        <ManagePayouts />
                    </div>
                 ) : (
                    <Link 
                        href="/sell" 
                        className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition"
                    >
                        Become a Seller
                    </Link>
                 )}
             </div>

             {/* ANALYTICS (Only show if Stripe connected) */}
             {user?.stripeConnectAccountId && analyticsData ? (
                 <div className="space-y-6">
                     <BentoGrid 
                        totalRevenue={analyticsData.totalRevenue} 
                        totalSales={analyticsData.totalSales}
                        totalViews={analyticsData.totalViews}
                     />
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
                        <RevenueChart data={analyticsData.chartData} />
                        {/* Future: Recent Orders List here */}
                     </div>
                 </div>
             ) : (
                 <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-10 text-center">
                     <h3 className="text-2xl font-bold mb-4">Start your journey</h3>
                     <p className="text-zinc-400 max-w-lg mx-auto mb-8">
                         Become a seller on NeonMarket to access advanced analytics, manage your products, and earn revenue.
                     </p>
                 </div>
             )}
        </section>

        {/* BUYER LIBRARY SECTION */}
        <section>
            <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
                 <span className="bg-cyan-500 w-2 h-8 rounded-full"></span>
                My Library
            </h1>
            <p className="text-zinc-400 mb-8 ml-5">Access your purchased assets universally.</p>
    
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
                <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
                <p className="text-zinc-500 mb-6">Your collection is empty.</p>
                <Link href="/products" className="text-purple-400 hover:text-purple-300 font-bold">
                  Browse the Marketplace &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition">
                    {/* Order Header */}
                    <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center border-b border-zinc-800">
                      <span className="text-xs font-mono text-zinc-500">ORDER {order.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-sm font-bold text-emerald-400">PAID ${(order.pricePaidInCents / 100).toFixed(2)}</span>
                    </div>
    
                    {/* Items */}
                    <div className="p-6 grid gap-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                              <img src={item.product.imagePath} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-white">{item.product.name}</h4>
                              <p className="text-sm text-zinc-500">Personal & Commercial License</p>
                            </div>
                          </div>
    
                          {/* THE REAL DOWNLOAD BUTTON */}
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