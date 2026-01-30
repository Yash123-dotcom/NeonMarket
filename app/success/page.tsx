// FIX: Change the import path to point to the root 'actions' folder
import { createOrder } from "@/actions/create-order"; 
import Navbar from "@/components/Navbar";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: Promise<{ session_id: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return redirect("/");
  }

  // 1. Save the Order
  try {
    await createOrder(session_id);
  } catch (error) {
    console.error("Order creation failed:", error);
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        
        {/* Success Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-green-500 blur-[60px] opacity-20 rounded-full"></div>
          <CheckCircle2 className="w-24 h-24 text-green-400 relative z-10" />
        </div>

        <h1 className="text-5xl font-black mb-6 tracking-tight">Payment Successful!</h1>
        <p className="text-xl text-gray-400 max-w-lg mb-12">
          Thank you for your purchase. Your digital assets are secured and ready for instant download.
        </p>

        {/* Action Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h3 className="font-bold text-white mb-6">What happens next?</h3>
          
          <div className="space-y-4">
            <Link 
              href="/dashboard"
              className="group flex items-center justify-between w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              <span className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                Access My Downloads
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              href="/"
              className="block w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-4 rounded-xl transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          A receipt has been sent to your email.
        </p>
      </div>
    </main>
  );
}