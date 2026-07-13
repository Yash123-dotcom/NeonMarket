import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageCircle, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Support | NeonMarket",
  description: "Get help and support for NeonMarket purchases and selling.",
};

const FAQS = [
  {
    q: "How do I download an asset I purchased?",
    a: "Once your payment is complete, you will receive an email with a secure download link. You can also access all your past purchases instantly from your Dashboard under the 'My Library' section."
  },
  {
    q: "What is the refund policy?",
    a: "Because digital goods cannot be 'returned', all sales are generally final. However, if a product is defective, misleading, or fails to work as advertised, we offer a 14-day money-back guarantee. Contact support with your order number."
  },
  {
    q: "How do payouts work for sellers?",
    a: "We partner with Stripe Connect to handle fast, automated payouts. Once you make a sale, your 85% cut is routed directly to your connected bank account. Payout schedules depend on your country but typically land within 2-7 rolling days."
  },
  {
    q: "Can I use purchased assets in commercial projects?",
    a: "Yes! All assets sold on NeonMarket come with a standard commercial license enabling you to use them in unlimited end products. You may not, however, resell or redistribute the raw asset itself."
  }
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />

      {/* Dynamic Background Light (Animated Blobs) */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 relative z-10 leading-none">
            How can we <span className="text-gradient-primary">help?</span>
          </h1>
          <p className="text-xl text-zinc-400 relative z-10 font-normal">
            Find answers to common questions or reach out to our team directly.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 relative z-10">
          <div className="glass-premium rounded-3xl p-8 hover:bg-white/5 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Our typical response time is under 12 hours for order issues and technical support.</p>
            <a href="mailto:support@neonmarket.com" className="inline-flex items-center text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-colors border border-white/5">
              support@neonmarket.com
            </a>
          </div>

          <div className="glass-premium rounded-3xl p-8 hover:bg-white/5 transition-all duration-300">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Creator Documentation</h3>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Are you a seller trying to set up payouts or upload large files? Read our seller guide.</p>
            <Link href="/sell" className="inline-flex items-center text-sm font-bold text-black bg-white hover:bg-zinc-200 px-5 py-2.5 rounded-full transition-colors">
              Read Guide
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-premium p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-4 text-white">{faq.q}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
