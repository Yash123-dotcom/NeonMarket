import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { Order } from '@/lib/models/Order';
import { Review } from '@/lib/models/Review';
import { User } from '@/lib/models/User';
import AddToCartButton from '@/components/AddtoCartbutton';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewsList } from '@/components/ReviewsList';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Star, ShieldCheck, Zap, Download, CheckCircle2, ArrowLeft } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;
  const { userId } = await auth();

  let product: any = null;
  let hasPurchased = null;
  let hasReviewed = null;

  try {
    await connectDB();

    const dbProduct = await Product.findById(productId).lean();
    if (dbProduct) {
      const seller = await User.findById(dbProduct.userId).lean();
      const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();

      // Attach user names to reviews
      const enrichedReviews = reviews.map((r) => ({ ...r, user: { name: 'Anonymous' } }));

      product = {
        ...dbProduct,
        id: dbProduct._id.toString(),
        user: seller ? { name: seller.name || 'Seller' } : { name: 'Seller' },
        reviews: enrichedReviews,
      };
    }

    if (userId && product) {
      hasPurchased = await Order.findOne({
        userId,
        isPaid: true,
        'items.productId': productId,
      }).lean();

      hasReviewed = await Review.findOne({ userId, productId }).lean();
    }
  } catch (error) {
    console.warn(`[MockMode] DB Connection failed for product ${productId}.`);
  }

  if (!product) return notFound();

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
      : 5.0;

  return (
    <main className='min-h-screen bg-background font-sans'>
      <Navbar />

      <div className='max-w-[1200px] mx-auto px-6 pt-32 pb-20'>
        <Link
          href='/products'
          className='inline-flex items-center text-[13px] font-medium text-zinc-400 hover:text-white mb-12 transition-colors'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Store
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32'>
          <div className='relative sticky top-32'>
            <div className='relative aspect-square bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl shadow-black/40'>
              <img src={product.imagePath} alt={product.name} className='w-full h-full object-cover' />
            </div>
            <div className='grid grid-cols-3 gap-6 mt-12 px-4'>
              <div className='text-center'>
                <Zap className='w-6 h-6 mx-auto mb-3 text-blue-400' strokeWidth={1.5} />
                <p className='text-[11px] font-semibold tracking-wide uppercase text-zinc-500'>Instant Download</p>
              </div>
              <div className='text-center'>
                <ShieldCheck className='w-6 h-6 mx-auto mb-3 text-blue-400' strokeWidth={1.5} />
                <p className='text-[11px] font-semibold tracking-wide uppercase text-zinc-500'>Secure file</p>
              </div>
              <div className='text-center'>
                <Download className='w-6 h-6 mx-auto mb-3 text-blue-400' strokeWidth={1.5} />
                <p className='text-[11px] font-semibold tracking-wide uppercase text-zinc-500'>Lifetime Access</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col pt-4'>
            <span className='text-blue-400 font-semibold text-sm mb-4'>New Arrival</span>
            <h1 className='text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white leading-[1.05]'>
              {product.name}
            </h1>

            <div className='flex items-center gap-2 mb-8'>
              <div className='flex text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-current' : 'fill-transparent stroke-current'}`} />
                ))}
              </div>
              <span className='text-zinc-500 text-sm'>{product.reviews.length} reviews</span>
            </div>

            <div className='bg-zinc-900/80 border border-white/10 rounded-[24px] p-8 mb-10'>
              <div className='flex items-baseline gap-2 mb-2'>
                <span className='text-4xl font-semibold text-white'>${(product.price / 100).toFixed(0)}</span>
                <span className='text-zinc-600 line-through text-lg'>${((product.price * 1.5) / 100).toFixed(0)}</span>
              </div>
              <p className='text-zinc-500 text-sm mb-6'>One-time payment. Lifetime access.</p>
              <AddToCartButton product={product} />
              <div className='mt-6 pt-6 border-t border-white/10 text-center'>
                <p className='text-xs text-zinc-500'>100% money-back guarantee for 30 days.</p>
              </div>
            </div>

            <div className='prose prose-invert max-w-none text-zinc-400 leading-relaxed mb-12'>
              <p>{product.description}</p>
            </div>

            <div className='border-t border-white/10 pt-10'>
              <h3 className='font-semibold text-white mb-6 text-lg'>In the box</h3>
              <ul className='space-y-4'>
                {['Source Files (Figma / Blender / Code)', 'Commercial License', 'High-Resolution Assets', 'Documentation'].map((item, i) => (
                  <li key={i} className='flex items-center gap-3 text-zinc-300'>
                    <CheckCircle2 className='w-5 h-5 text-blue-400' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t border-white/10 pt-24'>
          <h2 className='text-3xl font-semibold mb-12 text-center text-white'>Customer Reviews</h2>
          <div className="max-w-3xl mx-auto">
            {hasPurchased && !hasReviewed && (
              <div className='mb-16 bg-zinc-900/80 border border-white/10 p-8 rounded-[24px]'>
                <h3 className="text-lg font-semibold mb-4 text-white">Leave a review</h3>
                <ReviewForm productId={productId} />
              </div>
            )}
            <ReviewsList reviews={product.reviews || []} />
          </div>
        </div>
      </div>
    </main>
  );
}
