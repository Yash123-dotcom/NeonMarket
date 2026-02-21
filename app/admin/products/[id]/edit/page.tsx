import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { editProduct } from "@/actions/edit-product";
import { Save, X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();

  if (!product) return redirect("/admin/products");

  const updateAction = editProduct.bind(null, params.id);
  const productId = product._id.toString();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Edit Asset</h1>
        <Link href="/admin/products" className="p-2 hover:bg-white/10 rounded-full transition">
          <X className="w-6 h-6 text-zinc-400" />
        </Link>
      </div>

      <form action={updateAction} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">Product Name</label>
            <input name="name" type="text" defaultValue={product.name} required className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">Price ($)</label>
            <input name="price" type="number" defaultValue={product.price / 100} required className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Description</label>
          <textarea name="description" rows={6} defaultValue={product.description} required className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">Image URL</label>
            <input name="imagePath" type="url" defaultValue={product.imagePath} required className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">File Path</label>
            <input name="filePath" type="text" defaultValue={product.filePath} required className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">Stock Limit</label>
          <input name="stock" type="number" defaultValue={product.stock} className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition" />
        </div>
        <div className="pt-6">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}