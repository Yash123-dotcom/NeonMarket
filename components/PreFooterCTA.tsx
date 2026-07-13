"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PreFooterCTA() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.05] relative overflow-hidden bg-zinc-950">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 p-12 md:p-20 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md text-center shadow-2xl">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Ready to monetize your digital assets?
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Join thousands of creators earning on NeonMarket today. Setup takes less than 5 minutes and you keep 90% of every sale.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/sell"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Start Selling Now
          </Link>
          <Link 
            href="/products"
            className="group w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            Explore Assets
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
