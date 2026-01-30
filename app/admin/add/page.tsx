import { createProduct } from '@/actions/create-product';
import { Save, X } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AddProductPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-black'>Add New Asset</h1>
        <Link href='/admin' className='p-2 hover:bg-white/10 rounded-full transition'>
          <X className='w-6 h-6 text-gray-400' />
        </Link>
      </div>

      <form action={createProduct} className='space-y-6'>
        {/* Name & Price Row */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='text-sm font-bold text-gray-400'>Product Name</label>
            <input
              name='name'
              type='text'
              placeholder='e.g. Neon UI Kit'
              required
              className='w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-bold text-gray-400'>Price ($)</label>
            <input
              name='price'
              type='number'
              placeholder='49'
              required
              className='w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition'
            />
          </div>
        </div>

        {/* Description */}
        <div className='space-y-2'>
          <label className='text-sm font-bold text-gray-400'>Description</label>
          <textarea
            name='description'
            rows={4}
            placeholder='Describe the value of this asset...'
            required
            className='w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition'
          />
        </div>

        {/* Image & File Paths */}
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='text-sm font-bold text-gray-400'>Image URL</label>
            <input
              name='imagePath'
              type='url'
              placeholder='https://images.unsplash.com/...'
              required
              className='w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition'
            />
            <p className='text-xs text-gray-600'>Use Unsplash or host your own image.</p>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-bold text-gray-400'>File Path (Zip)</label>
            <input
              name='filePath'
              type='text'
              placeholder='product-files/my-file.zip'
              required
              className='w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition'
            />
            <p className='text-xs text-gray-600'>Must match a file inside your project folder.</p>
          </div>
        </div>

        {/* Stock */}
        <div className='space-y-2'>
          <label className='text-sm font-bold text-gray-400'>Stock Limit (Optional)</label>
          <input
            name='stock'
            type='number'
            placeholder='999'
            className='w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition'
          />
        </div>

        {/* Submit Button */}
        <div className='pt-4'>
          <button
            type='submit'
            className='w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2'
          >
            <Save className='w-5 h-5' />
            Launch Product
          </button>
        </div>
      </form>
    </div>
  );
}
