'use client';

import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    name: string | null;
  };
}

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className='text-center py-12 bg-gray-900/30 rounded-2xl border border-gray-800'>
        <p className='text-gray-400'>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {reviews.map((review) => (
        <div key={review.id} className='bg-gray-900/50 border border-gray-800 p-6 rounded-2xl'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white'>
                {review.user.name?.[0] || 'A'}
              </div>
              <div>
                <p className='text-white font-bold text-sm'>{review.user.name || 'Anonymous'}</p>
                <p className='text-green-400 text-xs'>Verified Purchase</p>
              </div>
            </div>
            <div className='text-right'>
              <div className='flex text-yellow-400 mb-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-current' : 'stroke-current fill-transparent'
                    }`}
                  />
                ))}
              </div>
              <p className='text-xs text-gray-500'>
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className='text-gray-300 leading-relaxed'>&quot;{review.comment}&quot;</p>
        </div>
      ))}
    </div>
  );
}
