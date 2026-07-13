"use client";

import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { Zap, ArrowRight, LogIn } from "lucide-react";
import { createSellerAccount } from "@/actions/stripe-connect";
import { NeonButton } from "./NeonButton";

interface SellPageCTAProps {
  isLoggedIn: boolean;
}

export default function SellPageCTA({ isLoggedIn }: SellPageCTAProps) {
  if (isLoggedIn) {
    return (
      <form action={createSellerAccount}>
        <NeonButton className="text-lg px-8 py-4 flex items-center gap-2 mx-auto shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 transform">
          <Zap className="w-5 h-5 fill-white" />
          Start Selling Now
        </NeonButton>
      </form>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Primary CTA: Sign Up */}
      <SignUpButton mode="modal">
        <NeonButton className="text-lg px-8 py-4 flex items-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 transform">
          Get Started <ArrowRight className="w-5 h-5 text-cyan-400" />
        </NeonButton>
      </SignUpButton>

      {/* Secondary CTA: Login */}
      <SignInButton mode="modal">
        <button className="text-zinc-400 hover:text-white font-semibold flex items-center gap-2 px-6 py-4 hover:bg-white/5 rounded-full transition">
          <LogIn className="w-4 h-4 text-zinc-400 group-hover:text-white" />
          Login
        </button>
      </SignInButton>
    </div>
  );
}
