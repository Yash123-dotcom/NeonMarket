import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Users, Globe, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | NeonMarket",
  description: "Learn about NeonMarket's mission to empower digital creators.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 relative">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10 leading-none">
            Empowering the <br />
            <span className="text-gradient-primary">
              Digital Economy.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed relative z-10 font-normal max-w-3xl mx-auto">
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
            <div key={stat.label} className="glass-premium p-8 rounded-3xl text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-24 relative z-10">
          <h2 className="text-4xl font-black mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-premium p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality First</h3>
              <p className="text-zinc-400 leading-relaxed">Every asset on NeonMarket goes through a rigorous curation process to ensure you&apos;re only getting the absolute best tools for your next project.</p>
            </div>
            
            <div className="glass-premium p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Creator Centric</h3>
              <p className="text-zinc-400 leading-relaxed">We believe creators should keep what they earn. That&apos;s why we offer industry-leading payout splits and instant transfers directly to your bank.</p>
            </div>

            <div className="glass-premium p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Frictionless Experience</h3>
              <p className="text-zinc-400 leading-relaxed">From uploading assets to downloading purchases, we obsess over making the UI as fast, beautiful, and intuitive as seamlessly possible.</p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
