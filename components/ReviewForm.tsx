'use client';

import { useState } from 'react';
import { createReview } from '@/actions/create-review';
import { Star, Send } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewFormProps {
  productId: string;
}

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeRating = hoveredRating || rating;

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

      toast.success('Review submitted! Thank you.');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Your Rating
        </label>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-7 h-7 transition-colors duration-150 ${
                    star <= activeRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-zinc-700'
                  }`}
                />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeRating > 0 && (
              <motion.span
                key={activeRating}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-yellow-400"
              >
                {RATING_LABELS[activeRating]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium text-zinc-300 mb-3">
          Your Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-zinc-800/80 border border-white/[0.08] rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/40 resize-none transition-all duration-200"
          placeholder="Share your experience with this product..."
          required
          minLength={10}
          maxLength={2000}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-zinc-600">Minimum 10 characters</p>
          <p className={`text-xs ${comment.length > 1800 ? 'text-amber-400' : 'text-zinc-600'}`}>
            {comment.length} / 2000
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:shadow-none"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Review
          </>
        )}
      </button>
    </form>
  );
}
