import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Edit, PlusCircle, Package } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  // Fetch all products, newest first
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='max-w-6xl mx-auto p-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-black text-white'>Inventory</h1>
          <p className='text-gray-400'>Manage your digital assets</p>
        </div>
        <Link
          href='/admin/add'
          className='bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition'
        >
          <PlusCircle className='w-5 h-5' />
          Add New
        </Link>
      </div>

      {/* Product List */}
      <div className='grid gap-4'>
        {products.length === 0 ? (
          <div className='text-center py-20 border border-dashed border-gray-800 rounded-2xl'>
            <Package className='w-12 h-12 text-gray-600 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-gray-400'>No products yet</h3>
            <p className='text-gray-600'>Start by adding your first asset.</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className='bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-purple-500/30 transition duration-300'
            >
              <div className='flex items-center gap-5'>
                {/* Thumbnail */}
                <div className='w-16 h-16 bg-black rounded-lg overflow-hidden border border-gray-800 relative'>
                  {/* Use standard img for Admin to avoid next/image complexity with external URLs initially */}
                  <img
                    src={product.imagePath}
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Info */}
                <div>
                  <h3 className='font-bold text-white text-lg'>{product.name}</h3>
                  <div className='flex items-center gap-3 text-sm text-gray-500'>
                    <span className='text-green-400 font-mono font-bold'>
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    <span>•</span>
                    <span>{product.stock} in stock</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='flex items-center gap-3'>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-white text-gray-400 hover:text-black rounded-lg transition font-bold text-sm'
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
