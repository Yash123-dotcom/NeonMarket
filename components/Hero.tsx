"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-black pt-20">
      
      {/* Dynamic Background Light (Subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,122,255,0.08),rgba(255,255,255,0)_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(0,122,255,0.15),rgba(0,0,0,0)_60%)] pointer-events-none" />
      
      <div className="relative z-10 px-6 max-w-[1400px] mx-auto w-full">
        <motion.div 
          style={{ y: textY, opacity }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge: New & Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[13px] font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New Collection Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-9xl font-[600] tracking-tight mb-8 text-black dark:text-white"
            style={{ letterSpacing: '-0.03em', lineHeight: 0.95 }}
          >
            Creativity.
            <br />
            <span className="text-zinc-400 dark:text-zinc-600">Unleashed.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          >
            The world's most premium marketplace for digital assets.
            <br className="hidden md:block" />
            Curated by experts. Designed for you.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link 
              href="/products" 
              className="px-8 py-4 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-full font-medium text-[17px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
            >
              Browse Products
            </Link>
            
            <Link 
              href="/sell" 
              className="group flex items-center gap-2 px-8 py-4 text-[17px] font-medium text-[#06c] hover:text-[#0071E3] transition-colors"
            >
              <span>Selling on NeonMarket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}