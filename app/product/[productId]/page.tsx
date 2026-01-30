import { prisma } from '@/lib/db';
import AddToCartButton from '@/components/AddtoCartbutton';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewsList } from '@/components/ReviewsList';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Star, ShieldCheck, Zap, Download, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;
  const { userId } = await auth();
  
  let product: any = null;

  try {
    product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        user: { select: { name: true } },
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  } catch (error) {
    console.warn(`[MockMode] DB Connection failed for product ${productId}.`);
  }

  if (!product) return notFound();

  // Calculate average rating
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length
      : 5.0;

  // Check purchase status
  let hasPurchased = null;
  let hasReviewed = null;
  
  try {
    if (userId) {
        hasPurchased = await prisma.order.findFirst({
            where: {
              userId,
              isPaid: true,
              items: { some: { productId: productId } },
            },
        });
        
        hasReviewed = await prisma.review.findUnique({
            where: { userId_productId: { userId, productId } },
        });
    }
  } catch (e) {
      console.warn("Could not check purchase status", e);
  }

  return (
    <main className='min-h-screen bg-white dark:bg-black font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-white'>
      <Navbar />

      <div className='max-w-[1200px] mx-auto px-6 pt-32 pb-20'>
        {/* Breadcrumb */}
        <Link
          href='/products'
          className='inline-flex items-center text-[13px] font-medium text-zinc-500 hover:text-black dark:hover:text-white mb-12 transition-colors'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Store
        </Link>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32'>
          {/* LEFT: Product Image */}
          <div className='relative sticky top-32'>
            <div className='relative aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 dark:shadow-white/5'>
              <img
                src={product.imagePath}
                alt={product.name}
                className='w-full h-full object-cover'
              />
            </div>
            {/* Minimal features below image */}
            <div className='grid grid-cols-3 gap-6 mt-12 px-4'>
                <div className='text-center'>
                    <Zap className='w-6 h-6 mx-auto mb-3 text-zinc-900 dark:text-white' strokeWidth={1.5} />
                    <p className='text-[11px] font-semibold tracking-wide uppercase text-zinc-500'>Instant Download</p>
                </div>
                <div className='text-center'>
                    <ShieldCheck className='w-6 h-6 mx-auto mb-3 text-zinc-900 dark:text-white' strokeWidth={1.5} />
                    <p className='text-[11px] font-semibold tracking-wide uppercase text-zinc-500'>Secure file</p>
                </div>
                <div className='text-center'>
                    <Download className='w-6 h-6 mx-auto mb-3 text-zinc-900 dark:text-white' strokeWidth={1.5} />
                    <p className='text-[11px] font-semibold tracking-wide uppercase text-zinc-500'>Lifetime Access</p>
                </div>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className='flex flex-col pt-4'>
            {/* New Badge */}
            <span className='text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4'>New Arrival</span>
            
            <h1 className='text-5xl md:text-6xl font-[600] tracking-tight mb-8 text-black dark:text-white leading-[1.05]'>
              {product.name}
            </h1>

            <div className='flex items-center gap-2 mb-8'>
              <div className='flex text-yellow-500'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-current' : 'fill-transparent stroke-current'}`}
                  />
                ))}
              </div>
              <span className='text-zinc-500 text-sm'>
                {product.reviews.length} reviews
              </span>
            </div>

            <div className='bg-zinc-50 dark:bg-zinc-900 rounded-[24px] p-8 mb-10'>
              <div className='flex items-baseline gap-2 mb-2'>
                <span className='text-4xl font-semibold text-black dark:text-white'>
                  ${(product.price / 100).toFixed(0)}
                </span>
                <span className='text-zinc-500 line-through text-lg'>
                  ${((product.price * 1.5) / 100).toFixed(0)}
                </span>
              </div>
              <p className='text-zinc-500 text-sm mb-6'>One-time payment. Lifetime access.</p>
              
              <AddToCartButton product={product} />
              
              <div className='mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center'>
                 <p className='text-xs text-zinc-400'>100% money-back guarantee for 30 days.</p>
              </div>
            </div>

            {/* Description */}
            <div className='prose prose-lg prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed mb-12'>
              <p>{product.description}</p>
            </div>

            {/* Features List */}
            <div className='border-t border-zinc-200 dark:border-zinc-800 pt-10'>
              <h3 className='font-semibold text-black dark:text-white mb-6 text-lg'>In the box</h3>
              <ul className='space-y-4'>
                {[
                    "Source Files (Figma / Blender / Code)",
                    "Commercial License",
                    "High-Resolution Assets",
                    "Documentation"
                ].map((item, i) => (
                    <li key={i} className='flex items-center gap-3 text-zinc-700 dark:text-zinc-300'>
                        <CheckCircle2 className='w-5 h-5 text-blue-500' />
                        {item}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className='border-t border-zinc-200 dark:border-zinc-800 pt-24'>
          <h2 className='text-3xl font-semibold mb-12 text-center text-black dark:text-white'>Customer Reviews</h2>
          <div className="max-w-3xl mx-auto">
             {hasPurchased && !hasReviewed && (
                <div className='mb-16 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-[24px]'>
                   <h3 className="text-lg font-semibold mb-4">Leave a review</h3>
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
