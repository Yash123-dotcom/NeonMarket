import Navbar from "@/components/Navbar";
import { Users, Target, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Empowering Creators.
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          NeonMarket is the premier destination for high-quality digital assets. We are building the future of the creator economy by connecting world-class designers with ambitious developers.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
            <Target className="w-12 h-12 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400">To democratize access to AAA-quality design resources, enabling anyone to build professional-grade software.</p>
        </div>
        <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
            <Shield className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Trust First</h3>
            <p className="text-gray-400">Every asset is vetted. Every transaction is secured by Stripe. We prioritize the safety of our community above all else.</p>
        </div>
        <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
            <Zap className="w-12 h-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Speed & Scale</h3>
            <p className="text-gray-400">Built on modern tech (Next.js 14) for lightning-fast downloads and seamless integrations.</p>
        </div>
      </div>
    </div>
  );
}
