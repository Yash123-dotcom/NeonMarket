"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  imagePath: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="group flex flex-col gap-4"
    >
      <Link href={`/product/${product.id}`} className="block relative group/link cursor-pointer">
        <GlassCard className="p-4 flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900/50 transition-transform duration-500 ease-out group-hover/link:scale-[1.02]">
            <motion.img
              src={product.imagePath}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/link:scale-105"
              loading="lazy"
            />
          </div>

          <div className="flex justify-between items-start pt-1">
            <div className="space-y-1">
              <h3 className="text-[17px] font-semibold text-white leading-tight group-hover/link:text-blue-400 transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-[15px] text-zinc-400">
                Digital Asset
              </p>
            </div>
            <div className="text-[15px] font-medium text-cyan-300 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
              ${(product.price / 100).toFixed(0)}
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}