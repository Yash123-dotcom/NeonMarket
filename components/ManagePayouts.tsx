"use client";

import { getStripeDashboardLink } from "@/actions/manage-payouts";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ManagePayouts() {
  const [loading, setLoading] = useState(false);

  const handlePayouts = async () => {
    setLoading(true);
    try {
      const { url } = await getStripeDashboardLink();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast.error("Error accessing payout dashboard");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayouts}
      disabled={loading}
      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
    >
      <DollarSign className="w-5 h-5 fill-white" />
      {loading ? "Redirecting..." : "Manage Payouts & Bank Info"}
    </button>
  );
}
