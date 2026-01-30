import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // 🔒 SECURITY CHECK
  // If the logged-in user is NOT the admin defined in .env, kick them out.
  if (userId !== process.env.ADMIN_USER_ID) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-white/10 bg-gray-900/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-xl font-black tracking-tighter">
            NEON<span className="text-purple-500">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600/10 text-purple-400 font-bold border border-purple-600/20">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition">
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link href="/admin/add" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition">
            <PlusCircle className="w-5 h-5" />
            Add New
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition text-sm">
            <LogOut className="w-4 h-4" />
            Exit Command Center
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}