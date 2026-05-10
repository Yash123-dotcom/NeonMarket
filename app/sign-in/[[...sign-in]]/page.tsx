'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { ShieldCheck, Zap, Star, ArrowLeft, Package, Users, TrendingUp } from 'lucide-react';

import { Typewriter } from '@/components/Typewriter';

const STATS = [
  { value: '12K+', label: 'Assets Available', icon: Package },
  { value: '8.4K', label: 'Happy Creators', icon: Users },
  { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
];

const FEATURES = [
  { icon: ShieldCheck, text: 'Bank-level encryption on every transaction' },
  { icon: Zap, text: 'Instant download after purchase — no waiting' },
  { icon: Star, text: 'Curated assets from top-tier creators' },
];

export default function SignInPage() {
  return (
    <div className='min-h-screen bg-[#080810] flex overflow-hidden'>

      {/* ── LEFT PANEL ── */}
      <div className='hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden'>

        {/* Layered background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-950 via-[#080810] to-indigo-950' />
          <div className='absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[130px]' />
          <div className='absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[110px]' />
          {/* Subtle dot grid */}
          <div
            className='absolute inset-0 opacity-[0.06]'
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
          {/* Glowing top border line */}
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent' />
        </div>

        {/* Back to home */}
        <div className='relative z-10'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group'
          >
            <ArrowLeft className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform' />
            Back to NeonMarket
          </Link>
        </div>

        {/* Center content */}
        <div className='relative z-10 space-y-10'>
          {/* Logo + tagline */}
          <div>
            <div className='inline-flex items-center gap-2 mb-6'>
              <div className='w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center'>
                <div className='w-4 h-4 rounded-md bg-gradient-to-br from-blue-400 to-cyan-400' />
              </div>
              <span className='text-white font-bold text-lg tracking-tight'>NeonMarket</span>
            </div>

            <h2 className='text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4 h-[100px] xl:h-[120px]'>
              The premium<br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
                <Typewriter words={['digital marketplace.', 'creator ecosystem.', 'asset library.']} delay={2000} />
              </span>
            </h2>
            <p className='text-zinc-400 text-base leading-relaxed max-w-sm'>
              Access thousands of hand-crafted UI kits, icons, templates, and 3D assets — all in one place.
            </p>
          </div>

          {/* Feature list */}
          <div className='space-y-4'>
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className='flex items-start gap-3'>
                <div className='mt-0.5 w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0'>
                  <Icon className='w-3.5 h-3.5 text-blue-400' strokeWidth={1.8} />
                </div>
                <p className='text-zinc-300 text-sm leading-relaxed'>{text}</p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className='flex items-center gap-8 pt-2 border-t border-white/[0.06]'>
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className='flex flex-col gap-1'>
                <p className='text-2xl font-bold text-white'>{value}</p>
                <div className='flex items-center gap-1.5 text-xs text-zinc-500'>
                  <Icon className='w-3 h-3' strokeWidth={1.5} />
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className='relative z-10'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
            <span className='text-xs text-zinc-400'>All systems operational</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className='flex-1 flex flex-col items-center justify-center px-6 py-12 relative'>

        {/* Faint glow behind form */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]' />
        </div>

        <div className='relative z-10 w-full max-w-[420px]'>

          {/* Mobile logo */}
          <div className='lg:hidden mb-8 flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center'>
              <div className='w-3.5 h-3.5 rounded-md bg-gradient-to-br from-blue-400 to-cyan-400' />
            </div>
            <span className='text-white font-bold text-base tracking-tight'>NeonMarket</span>
          </div>

          {/* Heading */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-white tracking-tight mb-2'>
              Welcome back 👋
            </h1>
            <p className='text-zinc-400 text-sm'>
              Sign in to continue to your account.{' '}
              <Link href='/sign-up' className='text-blue-400 hover:text-blue-300 transition-colors font-medium'>
                New here?
              </Link>
            </p>
          </div>

          {/* Auth form card */}
          <div className='bg-zinc-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden'>
            <div className='px-8 py-7'>
              <SignIn
                appearance={{
                  layout: {
                    socialButtonsPlacement: 'bottom',
                    socialButtonsVariant: 'iconButton',
                  },
                  elements: {
                    socialButtonsBlockButton: { display: 'none' },
                    socialButtonsIconButton: { display: 'none' },
                    dividerRow: { display: 'none' },
                    dividerText: { display: 'none' },
                    dividerLine: { display: 'none' },

                    card: 'bg-transparent shadow-none border-0 p-0 m-0 w-full max-w-full',
                    rootBox: 'w-full max-w-full flex flex-col',

                    formButtonPrimary:
                      'w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 border-0 mt-1',
                    formFieldInput:
                      'w-full bg-zinc-800/50 border border-zinc-700/60 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none box-border',
                    formFieldLabel: 'text-zinc-300 text-[13px] font-medium mb-1.5 block',
                    formFieldRow: 'mb-4 w-full',
                    formFieldInputShowPasswordButton: 'text-zinc-500 hover:text-zinc-300 transition-colors',

                    headerTitle: { display: 'none' },
                    headerSubtitle: { display: 'none' },
                    header: { display: 'none' },
                    footer: { display: 'none' },

                    formFieldErrorText: 'text-red-400 text-xs mt-1',
                    alertText: 'text-red-400 text-sm',
                    alert: 'bg-red-950/50 border border-red-800/50 rounded-xl p-3 mb-4',

                    spinner: 'text-blue-400',
                    cardBox: 'shadow-none w-full max-w-full',

                    identityPreviewText: 'text-zinc-300',
                    identityPreviewEditButtonIcon: 'text-blue-400',

                    formResendCodeLink: 'text-blue-400 hover:text-blue-300',
                    alternativeMethodsBlockButton: 'text-blue-400 hover:text-blue-300 border border-zinc-700 rounded-xl',
                  },
                }}
              />
            </div>

            {/* Card footer */}
            <div className='px-8 py-4 bg-zinc-950/50 border-t border-white/[0.04] flex items-center justify-center gap-5 text-xs text-zinc-600'>
              <Link href='/products' className='hover:text-zinc-400 transition-colors'>Browse Products</Link>
              <span className='text-zinc-800'>|</span>
              <Link href='/privacy' className='hover:text-zinc-400 transition-colors'>Privacy</Link>
              <span className='text-zinc-800'>|</span>
              <Link href='/terms' className='hover:text-zinc-400 transition-colors'>Terms</Link>
            </div>
          </div>

          {/* Trust row */}
          <div className='mt-6 flex items-center justify-center gap-6'>
            {[
              { Icon: ShieldCheck, label: 'Secure Auth' },
              { Icon: Zap, label: 'Instant Access' },
              { Icon: Star, label: 'Top Assets' },
            ].map(({ Icon, label }) => (
              <div key={label} className='flex items-center gap-1.5 text-[11px] text-zinc-600'>
                <Icon className='w-3 h-3 text-zinc-600' strokeWidth={1.5} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
