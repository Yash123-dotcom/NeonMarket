import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32">
        <h1 className="text-4xl font-black mb-8">License Agreement</h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-400 mb-12">
          <p className="lead">
            Our Standard License is designed to be simple and generous. It covers the vast majority of personal and commercial use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-900/50 border border-green-900/50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-500" />
                    You Can
                </h3>
                <ul className="space-y-4 text-gray-300">
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"/>Use assets in personal and commercial projects.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"/>Use assets for client work.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"/>Use assets in unlimited end products.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"/>Modify and combine assets with other works.</li>
                </ul>
            </div>

            <div className="bg-gray-900/50 border border-red-900/50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-500" />
                    You Cannot
                </h3>
                <ul className="space-y-4 text-gray-300">
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"/>Resell or redistribute the assets files themselves.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"/>Include assets in a UI kit or template for sale.</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"/>Claim copyright or exclusive rights to the assets.</li>
                </ul>
            </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
