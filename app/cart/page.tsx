'use client';

import { useCart } from '@/hooks/use-cart';
import CheckoutButton from '@/components/Checkoutbutton';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
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
    <main className='min-h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-white'>
      <Navbar />

      <div className='max-w-[1000px] mx-auto px-6 pt-32 pb-20'>
        <div className='flex items-end justify-between mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-6'>
          <h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white'>
            Your Bag. <span className='text-zinc-500'>Review your items.</span>
          </h1>
          
          {items.length > 0 && (
             <button
               onClick={clearCart}
               className='text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium'
             >
               Clear Bag
             </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center py-24'
          >
            <h2 className='text-2xl font-semibold mb-4 text-black dark:text-white'>Your bag is empty.</h2>
            <p className='text-zinc-500 mb-8'>Free delivery and free returns on all orders.</p>
            <Link
              href='/products'
              className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-transform active:scale-95'
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
            {/* Cart Items List */}
            <div className='lg:col-span-8'>
               <ul className='space-y-8'>
                  {items.map((item, index) => (
                    <li key={item.id} className='flex gap-6 py-6 border-b border-zinc-100 dark:border-zinc-900 last:border-0'>
                        <div className='h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900'>
                            <img
                              src={item.imagePath}
                              alt={item.name}
                              className='h-full w-full object-cover object-center'
                            />
                        </div>

                        <div className='flex flex-1 flex-col justify-between py-1'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h3 className='text-xl font-semibold text-black dark:text-white mb-1'>
                                      {item.name}
                                    </h3>
                                    <p className='text-zinc-500 text-sm max-w-[280px] line-clamp-1'>
                                      {item.description}
                                    </p>
                                </div>
                                <p className='text-lg font-semibold text-black dark:text-white'>
                                   ${(item.price / 100).toFixed(2)}
                                </p>
                            </div>

                            <div className='flex justify-between items-end'>
                                <div className='text-sm text-zinc-500'>
                                   Digital License • Instant Delivery
                                </div>
                                <button
                                   onClick={() => removeItem(item.id)}
                                   className='text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium'
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
            <div className='mt-16 lg:mt-0 lg:col-span-4'>
                <div className='sticky top-32'>
                    <h2 className='text-2xl font-semibold mb-6 text-black dark:text-white'>Summary</h2>
                    
                    <div className='space-y-4 mb-8'>
                        <div className='flex justify-between text-zinc-500'>
                            <span>Subtotal</span>
                            <span>${(totalPrice / 100).toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between text-zinc-500'>
                            <span>Estimated Tax</span>
                            <span>$0.00</span>
                        </div>
                        <div className='flex justify-between text-lg font-semibold text-black dark:text-white border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4'>
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
                          className="w-full bg-zinc-100 dark:bg-zinc-900 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-black dark:text-white placeholder:text-zinc-400"
                        />
                    </div>

                    <div className='space-y-4'>
                        <CheckoutButton couponCode={coupon} />
                        
                        <div className='flex items-center justify-center gap-2 text-xs text-zinc-400 mt-4'>
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
