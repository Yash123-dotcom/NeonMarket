"use client";

import { motion } from "framer-motion";

const COMPANIES = [
  "Acme Corp", "Vercel", "Stripe", "Framer", "Figma", 
  "Supabase", "Linear", "Raycast", "Next.js", "OpenAI"
];

export function TrustMarquee() {
  return (
    <div className="w-full py-10 overflow-hidden border-t border-b border-white/[0.05] bg-black/40 relative">
      {/* Gradient masks for fading edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-fit animate-marquee items-center gap-16 pr-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
        {[...COMPANIES, ...COMPANIES].map((company, index) => (
          <span 
            key={index} 
            className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-600 uppercase whitespace-nowrap"
          >
            {company}
          </span>
        ))}
      </div>
    </div>
  );
}
