"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NeonButton } from "./NeonButton";

import { Typewriter } from "./Typewriter";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      
      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-20 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-40 left-20 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-4000 pointer-events-none" />
      
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
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] mb-8 text-white h-[160px] sm:h-[180px] md:h-[220px]"
          >
            Digital Assets.
            <br />
            <span className="text-gradient-primary animate-text-shimmer">
              <Typewriter words={["Redefined.", "Elevated.", "Perfected.", "Unleashed."]} />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          >
            The world&apos;s most premium marketplace for digital assets.
            <br className="hidden md:block" />
            Curated by experts. Designed for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 items-center mb-16"
          >
            <Link href="/products">
              <NeonButton>
                Browse Products
              </NeonButton>
            </Link>
            
            <Link 
              href="/sell" 
              className="group flex items-center gap-2 px-8 py-4 text-[17px] font-medium text-zinc-300 hover:text-white transition-colors"
            >
              <span>Selling on NeonMarket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-blue-400" />
            </Link>
          </motion.div>

          {/* Floating Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-md"
          >
            <div className="flex -space-x-3">
              {[
                "/images/avatar-1.png",
                "/images/avatar-2.png",
                "/images/avatar-3.png",
                "/images/avatar-4.png"
              ].map((src, i) => (
                <img 
                  key={i} 
                  src={src} 
                  alt={`User avatar ${i + 1}`} 
                  className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover relative z-[4-i]"
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex text-yellow-400 text-xs">
                ★★★★★
              </div>
              <p className="text-xs text-zinc-400 font-medium">
                Trusted by <span className="text-white">10,000+</span> creators
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}