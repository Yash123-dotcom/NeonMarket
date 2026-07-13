import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AddProductForm from "@/components/AddProductForm";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";

export default async function AddProductPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await connectDB();

  // Load user profile
  const dbUser = await User.findById(userId).lean();
  const hasPayouts = dbUser?.isSeller && !!dbUser?.razorpayAccountId;

  return (
    <main className="min-h-screen bg-background text-white relative overflow-hidden pb-20">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/dashboard/products" 
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {hasPayouts ? (
          <>
            <h1 className="text-4xl font-black mb-2 tracking-tight leading-none">Add New Product</h1>
            <p className="text-zinc-400 mb-8 font-normal">
              List your digital assets in the marketplace and start selling instantly.
            </p>
            <AddProductForm />
          </>
        ) : (
          <div className="glass-premium rounded-3xl p-8 text-center max-w-xl mx-auto mt-10 shadow-2xl relative">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3 tracking-tight">Payout Setup Required</h2>
            <p className="text-zinc-400 leading-relaxed mb-8 text-sm">
              Before you can list products on the marketplace, you must complete your seller payout onboarding. This allows transactions to be routed directly to your account.
            </p>

            <Link href="/dashboard" className="block">
              <NeonButton className="w-full text-sm py-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Go to Dashboard Onboarding
              </NeonButton>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
