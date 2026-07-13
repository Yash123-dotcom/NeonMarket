'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export default function Navbar() {
  const { getTotalItems } = useCart();
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hasMounted = useHasMounted();
  const totalItems = hasMounted ? getTotalItems() : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-[900px] rounded-full ${
        isScrolled
          ? 'bg-zinc-900/70 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-3'
          : 'bg-zinc-900/30 backdrop-blur-md border border-white/5 py-4'
      }`}
    >
      <div className='px-6 h-10 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-[19px] font-semibold tracking-tight text-white flex items-center gap-2'
        >
          NeonMarket
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8'>
          <Link
            href='/products'
            className='text-[13px] font-medium text-zinc-400 hover:text-white transition-colors'
          >
            Store
          </Link>
          {isSignedIn && (
            <Link
              href='/dashboard'
              className='text-[13px] font-medium text-zinc-400 hover:text-white transition-colors'
            >
              Dashboard
            </Link>
          )}
          <Link
            href='/categories'
            className='text-[13px] font-medium text-zinc-400 hover:text-white transition-colors'
          >
            Categories
          </Link>
          <Link
            href='/sell'
            className='text-[13px] font-medium text-zinc-400 hover:text-white transition-colors'
          >
            Sell
          </Link>
          <Link
            href='/about'
            className='text-[13px] font-medium text-zinc-400 hover:text-white transition-colors'
          >
            About
          </Link>
          <Link
            href='/support'
            className='text-[13px] font-medium text-zinc-400 hover:text-white transition-colors'
          >
            Support
          </Link>
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-6'>
          {/* Cart */}
          <Link
            href='/cart'
            className='relative group flex items-center justify-center'
          >
            <ShoppingBag className='w-5 h-5 text-zinc-400 group-hover:text-white transition-colors' strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className='absolute -top-1.5 -right-2 w-[18px] h-[18px] bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20'>
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Button */}
          {isSignedIn ? (
            <div className="flex items-center justify-center p-0.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-white/5">
              <UserButton afterSignOutUrl='/' />
            </div>
          ) : (
            <Link
              href='/sign-in'
              className='text-[13px] font-medium text-zinc-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10'
            >
              Sign in
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-1'
          >
            {mobileMenuOpen ? (
              <X className='w-5 h-5 text-white' />
            ) : (
              <Menu className='w-5 h-5 text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-[calc(100%+10px)] left-0 w-full bg-zinc-900/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden'>
          <div className='px-6 py-6 space-y-4'>
            <Link
              href='/products'
              className='block text-xl font-semibold text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            {isSignedIn && (
              <Link
                href='/dashboard'
                className='block text-xl font-semibold text-white'
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              href='/categories'
              className='block text-xl font-semibold text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href='/sell'
              className='block text-xl font-semibold text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              href='/about'
              className='block text-xl font-semibold text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
