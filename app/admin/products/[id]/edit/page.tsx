import { prisma } from "@/lib/db";
import { editProduct } from "@/actions/edit-product";
import { Save, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  // 1. Fetch the existing product
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return redirect("/admin/products");
  }

  // 2. Create a "Bind" version of the server action 
  // This passes the ID automatically when the form is submitted
  const updateAction = editProduct.bind(null, product.id);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">Edit Asset</h1>
        <Link href="/admin/products" className="p-2 hover:bg-white/10 rounded-full transition">
          <X className="w-6 h-6 text-gray-400" />
        </Link>
      </div>

      <form action={updateAction} className="space-y-6">
        
        {/* Name & Price Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">Product Name</label>
            <input 
              name="name" 
              type="text" 
              defaultValue={product.name} // <--- PRE-FILL DATA
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">Price ($)</label>
            <input 
              name="price" 
              type="number" 
              defaultValue={product.price / 100} // Convert cents back to dollars
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400">Description</label>
          <textarea 
            name="description" 
            rows={6}
            defaultValue={product.description}
            required
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Image & File Paths */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">Image URL</label>
            <input 
              name="imagePath" 
              type="url" 
              defaultValue={product.imagePath}
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">File Path</label>
            <input 
              name="filePath" 
              type="text" 
              defaultValue={product.filePath}
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400">Stock Limit</label>
            <input 
              name="stock" 
              type="number" 
              defaultValue={product.stock}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
            />
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex gap-4">
          <button 
            type="submit"
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}