'use client';

import { useState } from 'react';
import { createReview } from '@/actions/create-review';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Please write at least 10 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('rating', rating.toString());
      formData.append('comment', comment);
      formData.append('productId', productId);

      await createReview(formData);

      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-900/50 border border-gray-800 rounded-2xl p-6'>
      <h3 className='text-xl font-bold mb-6'>Write a Review</h3>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Rating */}
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>Rating</label>
          <div className='flex space-x-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type='button'
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className='p-1 transition-colors'
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor='comment' className='block text-sm font-medium text-gray-300 mb-2'>
            Your Review
          </label>
          <textarea
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none'
            placeholder='Share your experience with this product...'
            required
            minLength={10}
            maxLength={500}
          />
          <p className='text-xs text-gray-500 mt-1'>{comment.length}/500 characters (minimum 10)</p>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
          className='w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors'
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
