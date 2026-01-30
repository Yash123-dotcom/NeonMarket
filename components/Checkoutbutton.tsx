"use client";

import { createCheckoutSession } from "@/actions/checkout";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function CheckoutButton({ couponCode }: { couponCode?: string }) {
  const { items } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    // 1. Block checkout if empty
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // 2. Force login if not signed in
    if (!user) {
      toast.error("Please login to checkout.");
      router.push("/sign-in");
      return;
    }

    setLoading(true);

    try {
      // 3. Call Server Action
      const result = await createCheckoutSession({
        productIds: items.map((item) => item.id),
        couponCode,
      });
      
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        throw new Error(result.error || result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-white text-black py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    >
      {loading ? (
        <span className="flex items-center gap-2">
           <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           Redirecting...
        </span>
      ) : (
        "Secure Checkout"
      )}
    </button>
  );
}