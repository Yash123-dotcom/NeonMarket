import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Order } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { Plus, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { NeonButton } from "@/components/NeonButton";

export default async function MyProductsPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  await connectDB();
  const dbProducts = await Product.find({ userId }).sort({ createdAt: -1 }).lean();

  // Count sales per product
  const productIds = dbProducts.map((p) => p._id.toString());
  const salesCounts: Record<string, number> = {};
  const orders = await Order.find({ 'items.productId': { $in: productIds }, isPaid: true }).lean();
  for (const order of orders) {
    for (const item of order.items) {
      if (productIds.includes(item.productId)) {
        salesCounts[item.productId] = (salesCounts[item.productId] || 0) + 1;
      }
    }
  }

  const products = dbProducts.map((p) => ({
    ...p,
    id: p._id.toString(),
    salesCount: salesCounts[p._id.toString()] || 0,
  }));

  return (
    <div className="min-h-screen bg-background text-white pb-20 relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-32 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black tracking-tight leading-none">My Products</h1>
          <Link href="/dashboard/products/new">
            <NeonButton className="text-sm px-6 py-3 flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Plus className="w-5 h-5" />
              Add Product
            </NeonButton>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 glass-premium rounded-3xl p-8 max-w-xl mx-auto mt-10 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">You haven&apos;t listed any products yet.</h3>
            <p className="text-zinc-400 mb-6 text-sm">Start selling your digital assets today in our premium marketplace.</p>
            <Link href="/dashboard/products/new" className="text-blue-400 font-semibold hover:text-cyan-400 transition-colors">
              Create your first product &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="glass-premium glass-card-hover p-6 rounded-2xl flex items-center justify-between transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden border border-white/10 relative">
                    <Image src={product.imagePath} width={64} height={64} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{product.name}</h3>
                    <p className="text-sm text-zinc-400">${(product.price / 100).toFixed(2)} • {product.salesCount} Sales</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${product.isActive ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}>
                    {product.isActive ? "Active" : "Draft"}
                  </div>
                  <Link href={`/product/${product.id}`} className="text-sm font-bold flex items-center gap-1.5 hover:text-white text-zinc-400 transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
