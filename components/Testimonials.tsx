"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    role: "Senior UI Designer",
    content: "The quality of the UI kits here is unmatched. It saved my agency hundreds of hours on our latest SaaS project.",
    avatar: "/images/avatar-1.png"
  },
  {
    name: "Marcus Chen",
    role: "Indie Developer",
    content: "I started selling my 3D icons here 6 months ago. The platform is incredibly creator-friendly. Highly recommended.",
    avatar: "/images/avatar-2.png"
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    content: "We use NeonMarket for all our rapid prototyping needs. The curated assets guarantee we always get premium quality.",
    avatar: "/images/avatar-3.png"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.05] bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Loved by creators worldwide
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Hear from the designers, developers, and creators who use NeonMarket every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="flex gap-1 text-yellow-400 mb-6 text-sm">
                ★★★★★
              </div>
              <p className="text-zinc-300 leading-relaxed mb-8 text-lg">
                "{review.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-white font-medium">{review.name}</h4>
                  <p className="text-zinc-500 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
