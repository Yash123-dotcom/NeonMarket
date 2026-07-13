import  Navbar  from "@/components/Navbar";
import  Footer  from "@/components/Footer";
import { DollarSign, Zap, Globe } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import SellPageCTA from "@/components/SellPageCTA";

export default async function SellPage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl font-black tracking-tighter mb-6 leading-none">
            Turn your Code into <br />
            <span className="text-gradient-primary">
              Passive Income.
            </span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-normal">
            Join the NeonMarket creator network. You build the assets, we handle the hosting, payments, and delivery. You keep 85% of every sale.
          </p>
          
          <SellPageCTA isLoggedIn={!!userId} />
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 relative z-10">
        <div className="glass-premium glass-card-hover p-8 rounded-3xl">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 border border-green-500/20">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Instant Payouts</h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            No waiting 30 days. Payments are routed directly to your connected bank account immediately after every sale.
          </p>
        </div>

        <div className="glass-premium glass-card-hover p-8 rounded-3xl">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Global Reach</h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            We handle VAT, currency conversion, and hosting. Your products are available to customers in 190+ countries.
          </p>
        </div>

        <div className="glass-premium glass-card-hover p-8 rounded-3xl">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Zero Friction</h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            Drag & drop upload. We auto-generate product pages, secure links, and handle customer support disputes.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}