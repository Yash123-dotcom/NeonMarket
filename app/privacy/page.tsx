import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32">
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-400">
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This includes your name, email address, and payment information (processed via Stripe).</p>

          <h3>2. How We Use Your Information</h3>
          <p>We use your information to provide, maintain, and improve our services, process transactions, and communicate with you about your account and updates.</p>

          <h3>3. Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

          <h3>4. Cookies</h3>
          <p>We use cookies to improve your experience on our site, understand how you interact with our services, and customize content.</p>

          <h3>5. Third-Party Services</h3>
          <p>We use third-party services like Clerk (authentication) and Stripe (payments) which have their own privacy policies.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
