import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Users, Globe, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | NeonMarket",
  description: "Learn about NeonMarket's mission to empower digital creators.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10">
            Empowering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Digital Economy.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed relative z-10 font-medium">
            NeonMarket is the premier marketplace for high-quality digital assets. We connect top-tier creators with developers, designers, and visionaries building the future of the web.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 relative z-10">
          {[
            { label: "Active Creators", value: "10K+" },
            { label: "Digital Assets", value: "250K+" },
            { label: "Total Downloads", value: "1.2M+" },
            { label: "Creator Payouts", value: "$5M+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-24 relative z-10">
          <h2 className="text-4xl font-black mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality First</h3>
              <p className="text-zinc-400">Every asset on NeonMarket goes through a rigorous curation process to ensure you're only getting the absolute best tools for your next project.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Creator Centric</h3>
              <p className="text-zinc-400">We believe creators should keep what they earn. That's why we offer industry-leading payout splits and instant transfers directly to your bank.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Frictionless Experience</h3>
              <p className="text-zinc-400">From uploading assets to downloading purchases, we obsess over making the UI as fast, beautiful, and intuitive as seamlessly possible.</p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
