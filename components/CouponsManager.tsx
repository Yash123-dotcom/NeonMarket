"use client";

import Navbar from "@/components/Navbar";
import { createCoupon, deleteCoupon } from "@/actions/create-coupon";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Ticket, Trash } from "lucide-react";
import { NeonButton } from "./NeonButton";

// Types (since client component)
interface Coupon {
    id: string;
    code: string;
    percentOff: number;
    isActive: boolean;
}

export default function CouponsPage({ coupons }: { coupons: Coupon[] }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
        await createCoupon(formData);
        toast.success("Coupon created!");
    } catch (error) {
        toast.error("Failed to create coupon. Code might exist.");
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if(confirm("Are you sure?")) {
          await deleteCoupon(id);
          toast.success("Coupon deleted");
      }
  }

  return (
    <div className="min-h-screen bg-background text-white pb-20 relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
        <h1 className="text-4xl font-black mb-8 flex items-center gap-4 tracking-tight leading-none">
            <Ticket className="w-10 h-10 text-cyan-400" />
            Manage Coupons
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Form */}
            <div className="glass-premium p-8 rounded-3xl h-fit shadow-2xl">
                <h3 className="text-xl font-bold mb-6 text-white">Create New Coupon</h3>
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-zinc-400">Code (e.g. SUMMER20)</label>
                        <input 
                          name="code" 
                          required 
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl p-4 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition uppercase" 
                          placeholder="SUMMER20" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-zinc-400">Discount Percentage (%)</label>
                        <input 
                          name="percentOff" 
                          type="number" 
                          min="1" 
                          max="100" 
                          required 
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl p-4 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition" 
                          placeholder="20" 
                        />
                    </div>
                    <NeonButton disabled={loading} className="w-full py-4 flex justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Create Coupon"}
                    </NeonButton>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 text-white">Your Active Coupons</h3>
                {coupons.length === 0 && <p className="text-zinc-500">No active coupons listed.</p>}
                
                {coupons.map(c => (
                    <div key={c.id} className="glass-premium p-6 rounded-2xl flex justify-between items-center transition hover:border-white/20">
                        <div>
                            <p className="font-black text-2xl text-cyan-400 tracking-tight leading-none mb-1">{c.code}</p>
                            <p className="text-sm text-zinc-400">{c.percentOff}% Off discount</p>
                        </div>
                        <button onClick={() => handleDelete(c.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-full text-red-400 border border-red-500/10 transition">
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
