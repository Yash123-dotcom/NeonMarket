import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32">
        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-400">
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using NeonMarket, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h3>2. Digital Assets License</h3>
          <p>When you purchase an asset on NeonMarket, you are granted a non-exclusive, perpetual, worldwide, non-transferable license to use the asset for personal and commercial projects. Rellieng or redistributing the asset files themselves is strictly prohibited.</p>

          <h3>3. Payments & Refunds</h3>
          <p>All payments are processed securely via Stripe. We offer a 30-day money-back guarantee for technical issues that cannot be resolved by our support team.</p>

          <h3>4. Seller Obligations</h3>
          <p>Sellers must own the rights to the content they upload. NeonMarket reserves the right to remove content that violates copyright laws or our community guidelines. Sellers receive 85% of the sale price, with 15% retained as a platform fee.</p>

          <h3>5. Limitation of Liability</h3>
          <p>NeonMarket is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
