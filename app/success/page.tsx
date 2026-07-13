// FIX: Change the import path to point to the root 'actions' folder
import { createOrder } from "@/actions/create-order"; 
import Navbar from "@/components/Navbar";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string; session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { order_id, session_id } = await searchParams;
  const targetId = order_id || session_id;

  if (!targetId) {
    return redirect("/");
  }

  // 1. Save / Verify the Order
  try {
    await createOrder(targetId);
  } catch (error) {
    console.error("Order verification failed:", error);
  }

  return (
    <main className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center relative z-10 pt-20">
        
        {/* Success Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-green-500 blur-[60px] opacity-20 rounded-full"></div>
          <CheckCircle2 className="w-24 h-24 text-green-400 relative z-10" />
        </div>

        <h1 className="text-5xl font-black mb-6 tracking-tight leading-none">Payment Successful!</h1>
        <p className="text-xl text-zinc-400 max-w-lg mb-12 font-normal">
          Thank you for your purchase. Your digital assets are secured and ready for instant download.
        </p>

        {/* Action Card */}
        <div className="glass-premium rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h3 className="font-bold text-white mb-6 text-lg">What happens next?</h3>
          
          <div className="space-y-4">
            <Link 
              href="/dashboard"
              className="group flex items-center justify-between w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <span className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                Access My Downloads
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              href="/"
              className="block w-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 font-bold py-4 rounded-xl transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500 font-normal">
          A receipt has been sent to your email.
        </p>
      </div>
    </main>
  );
}