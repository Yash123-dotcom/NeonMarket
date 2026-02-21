import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Order } from "@/lib/models/Order";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen bg-background text-white pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black">My Products</h1>
          <Link href="/dashboard/products/new" className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-xl font-bold mb-2">You haven&apos;t listed any products yet.</h3>
            <p className="text-zinc-500 mb-6">Start selling your digital assets today.</p>
            <Link href="/dashboard/products/new" className="text-blue-400 font-bold hover:text-white transition">
              Create your first product &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden">
                    <img src={product.imagePath} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-zinc-500">${(product.price / 100).toFixed(2)} • {product.salesCount} Sales</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${product.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {product.isActive ? "Active" : "Draft"}
                  </div>
                  <Link href={`/product/${product.id}`} className="text-sm font-bold hover:text-white text-zinc-400">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
