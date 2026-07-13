'use client';

import { useCart } from '@/hooks/use-cart';
import CheckoutButton from '@/components/Checkoutbutton';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const totalPrice = getTotalPrice();

  return (
    <main className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 pt-40 pb-20 relative z-10">
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Your Bag. <span className="text-zinc-500 font-normal">Review your items.</span>
          </h1>
          
          {items.length > 0 && (
             <button
               onClick={clearCart}
               className="text-sm text-blue-400 hover:text-blue-300 hover:underline font-medium"
             >
               Clear Bag
             </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 glass-premium rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Your bag is empty.</h2>
            <p className="text-zinc-500 mb-8 font-normal">Free delivery and free returns on all orders.</p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            {/* Cart Items List */}
            <div className="lg:col-span-8">
               <ul className="space-y-8">
                  {items.map((item, index) => (
                    <li key={item.id} className="flex gap-6 py-6 border-b border-white/5 last:border-0">
                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-950 border border-white/10">
                            <Image
                              src={item.imagePath}
                              alt={item.name}
                              width={128}
                              height={128}
                              className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                      {item.name}
                                    </h3>
                                    <p className="text-zinc-400 text-sm max-w-[280px] line-clamp-1 font-normal">
                                      {item.description}
                                    </p>
                                </div>
                                <p className="text-lg font-bold text-white">
                                   ${(item.price / 100).toFixed(2)}
                                </p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="text-sm text-zinc-500 font-normal">
                                   Digital License • Instant Delivery
                                </div>
                                <button
                                   onClick={() => removeItem(item.id)}
                                   className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-medium"
                                 >
                                   Remove
                                </button>
                            </div>
                        </div>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Summary Panel */}
            <div className="mt-16 lg:mt-0 lg:col-span-4">
                <div className="sticky top-32 glass-premium p-6 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 text-white">Summary</h2>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-zinc-400 font-normal">
                            <span>Subtotal</span>
                            <span>${(totalPrice / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400 font-normal">
                            <span>Estimated Tax</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-white border-t border-white/10 pt-4 mt-4">
                            <span>Total</span>
                            <span>${(totalPrice / 100).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                       <input 
                          type="text" 
                          placeholder="Promo Code" 
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-white placeholder:text-zinc-500"
                        />
                    </div>

                    <div className="space-y-4">
                        <CheckoutButton couponCode={coupon} />
                        
                        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-4 font-normal">
                           <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                           </svg>
                           Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
