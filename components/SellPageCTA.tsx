"use client";

import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { Zap, ArrowRight, LogIn } from "lucide-react";
import { createSellerAccount } from "@/actions/stripe-connect";

interface SellPageCTAProps {
  isLoggedIn: boolean;
}

export default function SellPageCTA({ isLoggedIn }: SellPageCTAProps) {
  if (isLoggedIn) {
    return (
      <form action={createSellerAccount}>
        <button className="bg-white text-black text-lg font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition flex items-center gap-2 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transform border border-white">
          <Zap className="w-5 h-5 fill-black" />
          Start Selling Now
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Primary CTA: Sign Up */}
      <SignUpButton mode="modal">
        <button className="bg-white text-black text-lg font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transform">
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </SignUpButton>

      {/* Secondary CTA: Login */}
      <SignInButton mode="modal">
        <button className="text-gray-400 hover:text-white font-medium flex items-center gap-2 px-6 py-4 hover:bg-white/5 rounded-full transition">
          <LogIn className="w-4 h-4" />
          Login
        </button>
      </SignInButton>
    </div>
  );
}
