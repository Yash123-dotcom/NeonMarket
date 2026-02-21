import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Layers, Cuboid, Music, MonitorPlay, Sparkles, Code2 } from "lucide-react";

export const metadata = {
  title: "Categories | NeonMarket",
  description: "Browse premium digital assets by category on NeonMarket.",
};

const CATEGORIES = [
  {
    name: "UI/UX Design Kits",
    description: "Premium user interface components, wireframes, and dashboard templates for Figma and React.",
    icon: Layers,
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    slug: "ui-ux",
    count: 142
  },
  {
    name: "3D Models & Assets",
    description: "High-poly and game-ready 3D models, textures, and environments for Blender and Unity.",
    icon: Cuboid,
    color: "from-purple-500 to-fuchsia-400",
    bg: "bg-purple-500/10",
    slug: "3d-models",
    count: 89
  },
  {
    name: "Audio & Soundscapes",
    description: "Cinematic scores, royalty-free music, foley, and sound effect packs for creators.",
    icon: Music,
    color: "from-emerald-500 to-green-400",
    bg: "bg-emerald-500/10",
    slug: "audio",
    count: 215
  },
  {
    name: "Video & VFX",
    description: "After Effects templates, LUTs, transitions, and high-quality stock footage.",
    icon: MonitorPlay,
    color: "from-rose-500 to-red-400",
    bg: "bg-rose-500/10",
    slug: "video",
    count: 64
  },
  {
    name: "Branding & Graphics",
    description: "Logo templates, vector illustrations, mockups, and presentation decks.",
    icon: Sparkles,
    color: "from-amber-500 to-yellow-400",
    bg: "bg-amber-500/10",
    slug: "graphics",
    count: 310
  },
  {
    name: "Code & Templates",
    description: "Full website templates, Saas boilerplates, plugins, and custom scripts.",
    icon: Code2,
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10",
    slug: "code",
    count: 128
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 relative">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 relative z-10">
            Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Categories</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl relative z-10">
            Explore our curated collection of premium digital assets, tools, and templates built by top creators around the world.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.slug} 
              href={`/products?category=${category.slug}`}
              className="group relative bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/80 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${category.bg} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full border border-white/5">
                    {category.count} items
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                  {category.name}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed mb-6 flex-grow text-sm">
                  {category.description}
                </p>

                <div className="flex items-center text-sm font-bold text-zinc-300 group-hover:text-white transition-colors mt-auto">
                  Explore Collection
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
