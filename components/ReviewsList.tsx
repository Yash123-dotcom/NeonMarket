'use client';

import { Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id?: string;
  _id?: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
  // New snapshot fields from upgraded schema
  userName?: string;
  userAvatarUrl?: string;
  // Legacy shape (backwards compat during transition)
  user?: { name?: string | null };
}

interface ReviewsListProps {
  reviews: Review[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700 fill-zinc-700'
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-white/[0.06]">
        <Star className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-400 font-medium">No reviews yet</p>
        <p className="text-zinc-600 text-sm mt-1">Be the first to share your experience</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex items-center gap-4 p-5 bg-zinc-900/50 border border-white/[0.06] rounded-2xl mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-white">{avgRating.toFixed(1)}</div>
          <StarRow rating={Math.round(avgRating)} />
          <p className="text-xs text-zinc-500 mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-4 text-right">{star}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400/70 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual reviews */}
      {reviews.map((review, idx) => {
        const id = review.id ?? review._id ?? String(idx);
        const displayName = review.userName ?? review.user?.name ?? 'Anonymous';
        const initial = displayName[0]?.toUpperCase() ?? 'A';
        const dateStr = new Date(review.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.4 }}
            className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-colors duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              {review.userAvatarUrl ? (
                <img
                  src={review.userAvatarUrl}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm shrink-0">
                  {initial}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <span className="text-sm font-semibold text-white">{displayName}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Purchase
                  </span>
                  <span className="text-xs text-zinc-600 ml-auto">{dateStr}</span>
                </div>
                <StarRow rating={review.rating} />
                <p className="mt-3 text-[14px] text-zinc-300 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
