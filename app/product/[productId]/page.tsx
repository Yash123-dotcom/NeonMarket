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
import {
  Star,
  ShieldCheck,
  Zap,
  Download,
  CheckCircle2,
  ArrowLeft,
  Tag,
  Users,
} from 'lucide-react';
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

      const serializedReviews = reviews.map((r) => ({
        id: r._id.toString(),
        rating: r.rating,
        comment: r.comment,
        userName: (r as any).userName ?? 'Anonymous',
        userAvatarUrl: (r as any).userAvatarUrl ?? null,
        createdAt: (r.createdAt as Date).toISOString(),
      }));

      product = {
        ...dbProduct,
        _id: undefined,
        id: dbProduct._id.toString(),
        category: (dbProduct as any).category ?? null,
        averageRating: (dbProduct as any).averageRating ?? 0,
        reviewCount: (dbProduct as any).reviewCount ?? reviews.length,
        downloadCount: (dbProduct as any).downloadCount ?? 0,
        createdAt: (dbProduct.createdAt as Date).toISOString(),
        updatedAt: (dbProduct.updatedAt as Date).toISOString(),
        user: seller ? { name: seller.name || 'Seller' } : { name: 'Seller' },
        reviews: serializedReviews,
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
    console.warn(`[ProductPage] DB Error for product ${productId}:`, error);
  }

  if (!product) return notFound();

  const averageRating = product.averageRating > 0 ? product.averageRating : 0;
  const reviewCount = product.reviewCount ?? product.reviews.length;

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Store
        </Link>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          {/* Left — image */}
          <div className="relative sticky top-32">
            <div className="relative aspect-square bg-zinc-900 rounded-[28px] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/[0.06]">
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Category overlay */}
              {product.category && (
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-zinc-300">
                    <Tag className="w-3 h-3" />
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Zap, label: 'Instant Download' },
                { icon: ShieldCheck, label: 'Secure File' },
                { icon: Download, label: 'Lifetime Access' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 bg-zinc-900/60 border border-white/[0.06] rounded-2xl text-center"
                >
                  <Icon className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                  <p className="text-[11px] font-semibold tracking-wide uppercase text-zinc-500 leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — details */}
          <div className="flex flex-col pt-2">
            {/* Category + badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-blue-400 text-sm font-semibold">
                {product.category ?? 'Digital Asset'}
              </span>
              {product.downloadCount > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500 bg-zinc-900 border border-white/[0.06] px-2.5 py-1 rounded-full">
                  <Users className="w-3 h-3" />
                  {product.downloadCount.toLocaleString()} downloads
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.08]">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              {averageRating > 0 ? (
                <span className="text-sm font-semibold text-yellow-400">{averageRating.toFixed(1)}</span>
              ) : null}
              <span className="text-sm text-zinc-500">
                {reviewCount > 0 ? `${reviewCount} review${reviewCount !== 1 ? 's' : ''}` : 'No reviews yet'}
              </span>
            </div>

            {/* Price + CTA */}
            <div className="bg-zinc-900/80 border border-white/[0.08] rounded-[22px] p-7 mb-10 space-y-5">
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl font-bold text-white">${(product.price / 100).toFixed(0)}</span>
                  <span className="text-zinc-600 line-through text-lg">
                    ${((product.price * 1.5) / 100).toFixed(0)}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    33% off
                  </span>
                </div>
                <p className="text-zinc-500 text-sm">One-time payment · Lifetime access</p>
              </div>

              <AddToCartButton product={product} />

              <p className="text-center text-xs text-zinc-600 pt-2 border-t border-white/[0.06]">
                🔒 30-day money-back guarantee
              </p>
            </div>

            {/* Description */}
            <div className="text-zinc-400 leading-relaxed text-[15px] mb-10">
              {product.description}
            </div>

            {/* What's in the box */}
            <div className="border-t border-white/[0.06] pt-8">
              <h3 className="font-semibold text-white mb-5 text-base">What&apos;s included</h3>
              <ul className="space-y-3">
                {[
                  'Source Files (Figma / Blender / Code)',
                  'Commercial License',
                  'High-Resolution Assets',
                  'Documentation & Support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14px] text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="border-t border-white/[0.06] pt-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Customer Reviews</h2>
              {reviewCount > 0 && (
                <p className="text-zinc-500 mt-2 text-sm">{reviewCount} verified purchase{reviewCount !== 1 ? 's' : ''}</p>
              )}
            </div>
            {averageRating > 0 && (
              <div className="flex items-center gap-2 text-right hidden sm:block">
                <div className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</div>
                <div className="flex gap-0.5 justify-end mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {hasPurchased && !hasReviewed && (
              <div className="bg-zinc-900/60 border border-white/[0.07] p-8 rounded-[24px]">
                <h3 className="text-lg font-semibold mb-6 text-white">Share your experience</h3>
                <ReviewForm productId={productId} />
              </div>
            )}
            <ReviewsList reviews={product.reviews ?? []} />
          </div>
        </div>
      </div>
    </main>
  );
}
