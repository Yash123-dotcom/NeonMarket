import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/Product';
import Link from 'next/link';
import { Edit, PlusCircle, Package } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div className='max-w-6xl mx-auto p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-black text-white'>Inventory</h1>
          <p className='text-zinc-400'>Manage your digital assets</p>
        </div>
        <Link
          href='/admin/add'
          className='bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition'
        >
          <PlusCircle className='w-5 h-5' />
          Add New
        </Link>
      </div>

      <div className='grid gap-4'>
        {products.length === 0 ? (
          <div className='text-center py-20 border border-dashed border-white/10 rounded-2xl'>
            <Package className='w-12 h-12 text-zinc-600 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-zinc-400'>No products yet</h3>
            <p className='text-zinc-600'>Start by adding your first asset.</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id.toString()}
              className='bg-zinc-900/80 border border-white/10 p-4 rounded-xl flex items-center justify-between group hover:border-blue-500/30 transition duration-300'
            >
              <div className='flex items-center gap-5'>
                <div className='w-16 h-16 bg-black rounded-lg overflow-hidden border border-white/10'>
                  <img src={product.imagePath} alt={product.name} className='w-full h-full object-cover' />
                </div>
                <div>
                  <h3 className='font-bold text-white text-lg'>{product.name}</h3>
                  <div className='flex items-center gap-3 text-sm text-zinc-500'>
                    <span className='text-green-400 font-mono font-bold'>${(product.price / 100).toFixed(2)}</span>
                    <span>•</span>
                    <span>{product.stock} in stock</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Link
                  href={`/admin/products/${product._id.toString()}/edit`}
                  className='flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white text-zinc-400 hover:text-black rounded-lg transition font-bold text-sm'
                >
                  <Edit className='w-4 h-4' />
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
