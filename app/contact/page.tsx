"use client";

import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     toast.success("Message sent! We'll get back to you shortly.");
   };
 
   return (
     <div className="min-h-screen bg-background text-white relative overflow-hidden">
       <Navbar />

       {/* Dynamic Background Light (Animated Blobs) */}
       <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
       <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
       
       <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
         
         {/* Contact Info */}
         <div className="flex flex-col justify-center">
             <h1 className="text-5xl font-black mb-8 leading-none">Get in touch.</h1>
             <p className="text-xl text-zinc-400 mb-12 font-normal">
                 Have a question? Need help with an order? We&apos;re here for you 24/7.
             </p>
 
             <div className="space-y-8">
                 <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                         <Mail className="w-8 h-8 text-blue-400" />
                     </div>
                     <div>
                         <h3 className="text-xl font-bold">Email Us</h3>
                         <p className="text-blue-400 font-medium">support@neonmarket.com</p>
                     </div>
                 </div>
                 <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                         <MessageSquare className="w-8 h-8 text-indigo-400" />
                     </div>
                     <div>
                         <h3 className="text-xl font-bold">Live Chat</h3>
                         <p className="text-zinc-400">Available Mon-Fri, 9am - 5pm EST</p>
                     </div>
                 </div>
             </div>
         </div>
 
         {/* Form */}
         <div className="glass-premium p-8 md:p-10 rounded-3xl">
             <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                     <label className="block text-sm font-bold mb-2 text-zinc-400">Name</label>
                     <input required className="w-full bg-black/40 border border-white/10 focus:border-blue-500/50 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 outline-none transition text-white placeholder:text-zinc-600" placeholder="John Doe" />
                 </div>
                 <div>
                     <label className="block text-sm font-bold mb-2 text-zinc-400">Email</label>
                     <input type="email" required className="w-full bg-black/40 border border-white/10 focus:border-blue-500/50 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 outline-none transition text-white placeholder:text-zinc-600" placeholder="john@example.com" />
                 </div>
                 <div>
                     <label className="block text-sm font-bold mb-2 text-zinc-400">Message</label>
                     <textarea required rows={4} className="w-full bg-black/40 border border-white/10 focus:border-blue-500/50 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 outline-none transition text-white placeholder:text-zinc-600" placeholder="How can we help?" />
                 </div>
                 <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] transform">
                     Send Message
                 </button>
             </form>
         </div>
       </div>
     </div>
   );
 }
