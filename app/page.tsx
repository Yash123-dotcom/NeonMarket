import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, WifiOff, ShieldCheck, Zap, Download, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

const MOCK_PRODUCTS: any[] = [
  {
    id: 'mock-1',
    name: 'Premium UI Kit',
    description: 'Complete design system with 200+ components',
    price: 4900,
    imagePath: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800',
    category: 'UI Kits',
    averageRating: 4.8,
    reviewCount: 42,
    downloadCount: 1230,
    isActive: true,
  },
  {
    id: 'mock-2',
    name: '3D Asset Pack',
    description: 'High-quality 3D models for modern apps',
    price: 6900,
    imagePath: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=800',
    category: '3D Models',
    averageRating: 4.9,
    reviewCount: 18,
    downloadCount: 560,
    isActive: true,
  },
  {
    id: 'mock-3',
    name: 'Modern Icon Set',
    description: '500+ icons in multiple styles and formats',
    price: 2900,
    imagePath: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800',
    category: 'Icons',
    averageRating: 4.7,
    reviewCount: 95,
    downloadCount: 3400,
    isActive: true,
  },
];

const VALUE_PROPS = [
  {
    icon: Zap,
    title: 'Instant Delivery',
    desc: 'Download your assets the moment payment clears — no waiting.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Licensed',
    desc: 'Every asset comes with a commercial license you can trust.',
  },
  {
    icon: Star,
    title: 'Curated Quality',
    desc: 'Hand-picked by creators, reviewed by buyers.',
  },
  {
    icon: Download,
    title: 'Lifetime Access',
    desc: 'Buy once, download anytime. Your library never expires.',
  },
];

export default async function Home() {
  let products: any[] = [];
  let isMockData = false;

  try {
    await connectDB();
    const dbProducts = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    products = dbProducts.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      imagePath: p.imagePath,
      category: (p as any).category ?? null,
      averageRating: (p as any).averageRating ?? 0,
      reviewCount: (p as any).reviewCount ?? 0,
      downloadCount: (p as any).downloadCount ?? 0,
    }));
  } catch {
    products = MOCK_PRODUCTS;
    isMockData = true;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {isMockData && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-amber-950/80 border border-amber-700 text-amber-300 text-sm font-medium rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md">
          <WifiOff className="w-4 h-4" />
          <span>Preview Mode</span>
        </div>
      )}

      <Hero />

      {/* Value props */}
      <section className="py-16 px-6 border-t border-white/[0.06] bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-6 bg-zinc-900/40 border border-white/[0.06] rounded-2xl hover:border-white/[0.12] transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-blue-400" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="text-blue-400 text-sm font-semibold mb-2">Handpicked for you</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="group mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              View all products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:text-blue-400 transition-all" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-zinc-400">No products available. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
