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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
            <h1 className="text-5xl font-black mb-8">Get in touch.</h1>
            <p className="text-xl text-gray-400 mb-12">
                Have a question? Need help with an order? We&apos;re here for you 24/7.
            </p>

            <div className="space-y-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Email Us</h3>
                        <p className="text-purple-400">support@neonmarket.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Live Chat</h3>
                        <p className="text-gray-400">Available Mon-Fri, 9am - 5pm EST</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Form */}
        <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-400">Name</label>
                    <input required className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-400">Email</label>
                    <input type="email" required className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="john@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-400">Message</label>
                    <textarea required rows={4} className="w-full bg-black border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition" placeholder="How can we help?" />
                </div>
                <button className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition">
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}
