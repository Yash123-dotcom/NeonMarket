import  Navbar  from "@/components/Navbar";
import  Footer  from "@/components/Footer";
import { DollarSign, Zap, Globe } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import SellPageCTA from "@/components/SellPageCTA";

export default async function SellPage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl font-black tracking-tighter mb-6">
            Turn your Code into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Passive Income.
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join the NeonMarket creator network. You build the assets, we handle the hosting, payments, and delivery. You keep 85% of every sale.
          </p>
          
          <SellPageCTA isLoggedIn={!!userId} />
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-3">Instant Payouts</h3>
          <p className="text-gray-400">
            No waiting 30 days. Payments are routed directly to your Stripe bank account immediately after every sale.
          </p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-3">Global Reach</h3>
          <p className="text-gray-400">
            We handle VAT, currency conversion, and hosting. Your products are available to customers in 190+ countries.
          </p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-3">Zero Friction</h3>
          <p className="text-gray-400">
            Drag & drop upload. We auto-generate product pages, secure links, and handle customer support disputes.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}