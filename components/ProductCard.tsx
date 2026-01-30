"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container with Apple-style Lift */}
        <div className="relative aspect-square overflow-hidden rounded-[22px] bg-zinc-100 dark:bg-zinc-800 transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/20 dark:group-hover:shadow-black/50">
          <motion.img
            src={product.imagePath}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle sheen effect on hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
        </div>

        {/* Minimalist Info */}
        <div className="mt-4 flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-[17px] font-semibold text-zinc-900 dark:text-zinc-50 leading-tight group-hover:text-blue-500 transition-colors">
              {product.name}
            </h3>
            <p className="text-[15px] text-zinc-500 dark:text-zinc-400">
              Digital Asset
            </p>
          </div>
          <div className="text-[15px] font-medium text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            ${(product.price / 100).toFixed(0)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}