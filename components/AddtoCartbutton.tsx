'use client';

import { Product } from '@prisma/client';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) {
    return (
      <button className='w-full py-4 px-8 rounded-xl font-bold text-lg bg-gray-800 text-gray-400 border border-gray-700'>
        Loading...
      </button>
    );
  }

  const inCart = isInCart(product.id);

  const handleClick = () => {
    if (!inCart) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imagePath: product.imagePath,
        description: product.description,
        filePath: product.filePath,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={inCart}
      className={`relative w-full py-5 px-8 rounded-2xl font-black text-xl transition-all transform duration-300 flex items-center justify-center gap-3 overflow-hidden group ${
        inCart
          ? 'bg-zinc-800 text-green-400 border border-green-500/30 cursor-not-allowed opacity-80'
          : 'bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] glow-box'
      }`}
    >
      {/* Dynamic Background Gradient for "Not In Cart" state */}
      {!inCart && (
         <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Shimmer Effect */}
      {!inCart && (
        <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />
      )}

      {inCart ? (
        <>
          <Check className='w-6 h-6' />
          <span className="relative z-20">ALREADY OWNED</span>
        </>
      ) : (
        <>
          <ShoppingCart className='w-6 h-6 relative z-20 group-hover:text-white transition-colors' />
          <span className="relative z-20 group-hover:text-white transition-colors">GET INSTANT ACCESS</span>
        </>
      )}
    </button>
  );
}
