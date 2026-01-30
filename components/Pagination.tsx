'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | undefined>;
}

export function Pagination({ currentPage, totalPages, searchParams = {} }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    // Add existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Add page param
    if (page > 1) params.set('page', page.toString());

    return `/products?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className='flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors'
        >
          <ChevronLeft className='w-4 h-4 mr-1' />
          Previous
        </Link>
      ) : (
        <span className='flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-900 border border-gray-800 rounded-lg cursor-not-allowed'>
          <ChevronLeft className='w-4 h-4 mr-1' />
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className='flex space-x-1'>
        {getVisiblePages().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className='px-3 py-2 text-gray-500'>
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={createPageUrl(pageNum)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white border border-purple-500'
                  : 'text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className='flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors'
        >
          Next
          <ChevronRight className='w-4 h-4 ml-1' />
        </Link>
      ) : (
        <span className='flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-900 border border-gray-800 rounded-lg cursor-not-allowed'>
          Next
          <ChevronRight className='w-4 h-4 ml-1' />
        </span>
      )}
    </div>
  );
}
