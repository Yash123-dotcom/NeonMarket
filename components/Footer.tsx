import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-6 block">
              NEON<span className="text-purple-500">MARKET</span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              The premium marketplace for next-generation digital assets. 
              Designed for creators who demand the best.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-purple-400 transition">Browse Assets</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-400 transition">My Library</Link></li>
              <li><Link href="/sell" className="hover:text-purple-400 transition">Sell Your Work</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/license" className="hover:text-purple-400 transition">License</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 NeonMarket Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 text-gray-500 hover:text-white transition" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-gray-500 hover:text-white transition" />
            </a>
            <a href="https://github.com" aria-label="Github" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-gray-500 hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}