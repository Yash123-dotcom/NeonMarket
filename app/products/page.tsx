import { prisma } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    category?: string;
  }>;
}

const PRODUCTS_PER_PAGE = 12;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { search, page = '1', category } = await searchParams;
  const currentPage = parseInt(page);
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

  // Build where clause for filtering
  const where = {
    isActive: true,
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  };

  let products: any[] = [];
  let totalProducts = 0;

  try {
    const [dbProducts, dbTotal] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: PRODUCTS_PER_PAGE,
        include: {
          user: { select: { name: true } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);
    products = dbProducts;
    totalProducts = dbTotal;
  } catch (error) {
    console.warn("DB Connection failed. Using safe empty state.");
    products = [];
  }

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <main className='min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-white'>
      <Navbar />

      <div className='max-w-[1400px] mx-auto px-6 pt-32 pb-20'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-8'>
          <div>
            <h1 className='text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-black dark:text-white'>
              Store. <span className='text-zinc-500 dark:text-zinc-500'>The best way to buy the assets you love.</span>
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className='mb-16 max-w-xl'>
          <Suspense fallback={<div className='h-12 bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse' />}>
            <SearchBar initialSearch={search} />
          </Suspense>
        </div>

        {/* Results Info */}
        <div className='flex justify-between items-center mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4'>
          <p className='text-[13px] font-medium text-zinc-500 dark:text-zinc-400'>
            {search ? (
              <>Showing {products.length} results for &quot;{search}&quot;</>
            ) : (
              <>All Products ({totalProducts})</>
            )}
          </p>
          <div className='text-[13px] font-medium text-zinc-500 dark:text-zinc-400'>
             Sort by: <span className='text-black dark:text-white'>Newest</span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mb-16'>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className='text-center py-32 bg-zinc-50 dark:bg-zinc-900 rounded-[32px]'>
            <h3 className='text-2xl font-semibold mb-2 text-black dark:text-white'>No products found</h3>
            <p className='text-zinc-500 dark:text-zinc-400 max-w-md mx-auto'>
              {search
                ? `We couldn't find any matches for "${search}".`
                : 'Check back later for new drops.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-20">
             <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{ search, category }}
              />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
