"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Download, Tag } from "lucide-react";

interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  imagePath: string;
  description?: string;
  category?: string;
  averageRating?: number;
  reviewCount?: number;
  downloadCount?: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const productId = product.id ?? product._id;
  const rating = product.averageRating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const downloads = product.downloadCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="group"
    >
      <Link href={`/product/${productId}`} className="block">
        <div className="relative flex flex-col bg-zinc-900 border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
            <img
              src={product.imagePath}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Category badge */}
            {product.category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-zinc-300">
                  <Tag className="w-2.5 h-2.5" />
                  {product.category}
                </span>
              </div>
            )}
            {/* Price badge */}
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/90 backdrop-blur-md text-white text-[13px] font-semibold shadow-lg shadow-blue-500/20">
                ${(product.price / 100).toFixed(0)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-[15px] font-semibold text-white leading-tight mb-1.5 truncate group-hover:text-blue-300 transition-colors duration-200">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2 mb-4">
                {product.description}
              </p>
            )}

            {/* Footer stats */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <Star
                  className={`w-3.5 h-3.5 ${
                    rating > 0 ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"
                  }`}
                />
                <span className="text-[12px] font-medium text-zinc-400">
                  {rating > 0 ? rating.toFixed(1) : "New"}
                </span>
                {reviewCount > 0 && (
                  <span className="text-[12px] text-zinc-600">({reviewCount})</span>
                )}
              </div>
              {downloads > 0 && (
                <div className="flex items-center gap-1 text-zinc-600">
                  <Download className="w-3 h-3" />
                  <span className="text-[11px]">{downloads.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}