import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, WifiOff } from 'lucide-react';
import { Product } from '@prisma/client';

export const dynamic = 'force-dynamic';

const MOCK_PRODUCTS: any[] = [
  {
    id: "mock-1",
    name: "Premium UI Kit",
    description: "Complete design system with 200+ components",
    price: 4900,
    stock: 100,
    imagePath: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2940",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "mock-2",
    name: "3D Asset Pack",
    description: "High-quality 3D models for modern apps",
    price: 6900,
    stock: 50,
    imagePath: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=2940",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "mock-3",
    name: "Modern Icon Set",
    description: "500+ icons in multiple styles",
    price: 2900,
    stock: 200,
    imagePath: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2940",
    isActive: true,
    createdAt: new Date(),
  },
];

export default async function Home() {
  let products: Product[] = [];
  let isMockData = false;

  try {
    products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  } catch (error) {
    console.warn('⚠️ Database connection failed. Switching to MOCK MODE.');
    products = MOCK_PRODUCTS as Product[];
    isMockData = true;
  }

  return (
    <main className='min-h-screen bg-white dark:bg-zinc-950'>
      <Navbar />
      
      {isMockData && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm font-medium rounded-full flex items-center gap-2 shadow-lg">
          <WifiOff className="w-4 h-4" />
          <span>Preview Mode</span>
        </div>
      )}

      <Hero />

      <section className='py-24 px-6 bg-zinc-50 dark:bg-zinc-900/50'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-end justify-between mb-16'>
            <div>
              <h2 className='text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4'>
                Featured Products
              </h2>
              <p className='text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl'>
                Handpicked premium digital assets from talented creators.
              </p>
            </div>
            <Link
              href='/products'
              className='group flex items-center gap-2 text-zinc-900 dark:text-white font-semibold hover:gap-3 transition-all mt-4 md:mt-0'
            >
              View All
              <ArrowRight className='w-5 h-5' />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <p className='text-zinc-600 dark:text-zinc-400 text-lg'>
               No products available. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
