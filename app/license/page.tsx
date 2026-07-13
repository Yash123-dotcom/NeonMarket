import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-background text-white pb-20 relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-40 relative z-10">
        <h1 className="text-4xl font-black mb-8 leading-none">License Agreement</h1>
        <div className="prose prose-invert prose-lg max-w-none text-zinc-400 mb-12">
          <p className="lead font-normal">
            Our Standard License is designed to be simple and generous. It covers the vast majority of personal and commercial use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-premium p-8 rounded-3xl border-emerald-500/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-400" />
                    You Can
                </h3>
                <ul className="space-y-4 text-zinc-300">
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0"/>Use assets in personal and commercial projects.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0"/>Use assets for client work.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0"/>Use assets in unlimited end products.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0"/>Modify and combine assets with other works.</li>
                </ul>
            </div>

            <div className="glass-premium p-8 rounded-3xl border-red-500/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-400" />
                    You Cannot
                </h3>
                <ul className="space-y-4 text-zinc-300">
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"/>Resell or redistribute the assets files themselves.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"/>Include assets in a UI kit or template for sale.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"/>Claim copyright or exclusive rights to the assets.</li>
                </ul>
            </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
