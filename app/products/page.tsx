import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { ProductCard } from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Suspense } from 'react';

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

  let products: any[] = [];
  let totalProducts = 0;

  try {
    await connectDB();

    const query: any = { isActive: true };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [dbProducts, count] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(PRODUCTS_PER_PAGE).lean(),
      Product.countDocuments(query),
    ]);

    products = dbProducts.map((p) => ({ ...p, id: p._id.toString() }));
    totalProducts = count;
  } catch (error) {
    console.warn("DB Connection failed. Using safe empty state.");
    products = [];
  }

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <main className='min-h-screen bg-background text-foreground'>
      <Navbar />

      <div className='max-w-[1400px] mx-auto px-6 pt-32 pb-20'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-8'>
          <div>
            <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white'>
              Store. <span className='text-zinc-500'>The best way to buy the assets you love.</span>
            </h1>
          </div>
        </div>

        <div className='mb-16 max-w-xl'>
          <Suspense fallback={<div className='h-12 bg-white/5 rounded-xl animate-pulse border border-white/10' />}>
            <SearchBar initialSearch={search} />
          </Suspense>
        </div>

        <div className='flex justify-between items-center mb-8 border-b border-white/10 pb-4'>
          <p className='text-[13px] font-medium text-zinc-400'>
            {search ? (
              <>Showing {products.length} results for &quot;{search}&quot;</>
            ) : (
              <>All Products ({totalProducts})</>
            )}
          </p>
          <div className='text-[13px] font-medium text-zinc-400'>
            Sort by: <span className='text-white'>Newest</span>
          </div>
        </div>

        {products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mb-16'>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className='text-center py-32 bg-white/5 border border-white/10 rounded-[32px]'>
            <h3 className='text-2xl font-semibold mb-2 text-white'>No products found</h3>
            <p className='text-zinc-400 max-w-md mx-auto'>
              {search
                ? `We couldn't find any matches for "${search}".`
                : 'Check back later for new drops.'}
            </p>
          </div>
        )}

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
