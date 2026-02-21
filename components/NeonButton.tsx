"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface NeonButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: ReactNode;
}

export function NeonButton({ children, className = "", ...props }: NeonButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group px-8 py-4 font-bold text-white rounded-full bg-zinc-950 border border-zinc-800 transition-all overflow-hidden ${className}`}
      {...props}
    >
      {/* Ambient background blur */}
      <span className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/30 transition-colors duration-300 blur-xl pointer-events-none"></span>
      
      {/* Border gradient on hover */}
      <span 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full" 
        style={{ 
            background: 'linear-gradient(to right, #3b82f6, #22d3ee)', 
            padding: '1px', 
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
        }} 
      />

      <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
        {children}
      </span>
    </motion.button>
  );
}
