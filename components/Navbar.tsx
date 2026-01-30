'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent py-4'
      }`}
    >
      <div className='max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-[19px] font-semibold tracking-tight text-black dark:text-white flex items-center gap-2'
        >
          NeonMarket
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8'>
          <Link
            href='/products'
            className='text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors'
          >
            Store
          </Link>
          <Link
            href='/categories'
            className='text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors'
          >
            Categories
          </Link>
          <Link
            href='/sell'
            className='text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors'
          >
            Sell
          </Link>
          <Link
            href='/about'
            className='text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors'
          >
            About
          </Link>
          <Link
            href='/support'
            className='text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors'
          >
            Support
          </Link>
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-6'>
          {/* Cart */}
          <Link
            href='/cart'
            className='relative group'
          >
            <ShoppingBag className='w-5 h-5 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors' strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 w-4 h-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-full flex items-center justify-center'>
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Button */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl='/' />
          ) : (
            <SignInButton mode='modal'>
              <button className='text-[13px] font-medium text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors'>
                Sign in
              </button>
            </SignInButton>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-1'
          >
            {mobileMenuOpen ? (
              <X className='w-5 h-5 text-zinc-800 dark:text-white' />
            ) : (
              <Menu className='w-5 h-5 text-zinc-800 dark:text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-800 shadow-xl'>
          <div className='px-6 py-6 space-y-4'>
            <Link
              href='/products'
              className='block text-xl font-semibold text-zinc-900 dark:text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href='/categories'
              className='block text-xl font-semibold text-zinc-900 dark:text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href='/sell'
              className='block text-xl font-semibold text-zinc-900 dark:text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              href='/about'
              className='block text-xl font-semibold text-zinc-900 dark:text-white'
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
