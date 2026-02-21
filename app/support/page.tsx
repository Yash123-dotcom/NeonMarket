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
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 relative z-10">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">help?</span>
          </h1>
          <p className="text-xl text-zinc-400 relative z-10">
            Find answers to common questions or reach out to our team directly.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 relative z-10">
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/80 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-zinc-400 mb-6 text-sm">Our typical response time is under 12 hours for order issues and technical support.</p>
            <a href="mailto:support@neonmarket.example" className="inline-flex items-center text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
              support@neonmarket.com
            </a>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/80 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Creator Documentation</h3>
            <p className="text-zinc-400 mb-6 text-sm">Are you a seller trying to set up payouts or upload large files? Read our seller guide.</p>
            <Link href="/sell" className="inline-flex items-center text-sm font-bold text-black bg-white hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">
              Read Guide
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-4 text-white/90">{faq.q}</h3>
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
