"use client";

import Navbar from "@/components/Navbar";
import { createCoupon, deleteCoupon } from "@/actions/create-coupon";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Ticket, Trash } from "lucide-react";

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
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32">
        <h1 className="text-4xl font-black mb-8 flex items-center gap-4">
            <Ticket className="w-10 h-10 text-yellow-400" />
            Manage Coupons
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Form */}
            <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 h-fit">
                <h3 className="text-xl font-bold mb-6">Create New Coupon</h3>
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-400">Code (e.g. SUMMER20)</label>
                        <input name="code" required className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition uppercase" placeholder="SUMMER20" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-gray-400">Discount Percentage (%)</label>
                        <input name="percentOff" type="number" min="1" max="100" required className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="20" />
                    </div>
                    <button disabled={loading} className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition flex justify-center">
                        {loading ? <Loader2 className="animate-spin" /> : "Create Coupon"}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold mb-2">Your Active Coupons</h3>
                {coupons.length === 0 && <p className="text-gray-500">No coupons yet.</p>}
                
                {coupons.map(c => (
                    <div key={c.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex justify-between items-center">
                        <div>
                            <p className="font-black text-2xl text-purple-400">{c.code}</p>
                            <p className="text-gray-400">{c.percentOff}% Off</p>
                        </div>
                        <button onClick={() => handleDelete(c.id)} className="p-2 hover:bg-red-500/10 rounded-full text-red-500 transition">
                            <Trash className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
