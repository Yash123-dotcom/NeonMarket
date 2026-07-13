'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ShieldCheck, Download, Package, ArrowLeft, Sparkles, Users, Star } from 'lucide-react';

import { Typewriter } from '@/components/Typewriter';
const PERKS = [
  {
    icon: Download,
    title: 'Instant Downloads',
    desc: 'Files land in your library the second payment clears.',
  },
  {
    icon: Package,
    title: 'Lifetime Access',
    desc: 'Buy once. Access everything, forever.',
  },
  {
    icon: Sparkles,
    title: 'Premium Quality',
    desc: 'Every asset reviewed and approved by our team.',
  },
];

const SOCIAL_PROOF = [
  { value: '8,400+', label: 'Creators joined' },
  { value: '12K+', label: 'Assets available' },
  { value: '4.9★', label: 'Average rating' },
];

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-[#080810] flex overflow-hidden'>

      {/* ── LEFT PANEL ── */}
      <div className='hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden'>

        {/* Layered background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#080810] to-blue-950' />
          <div className='absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[130px]' />
          <div className='absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[110px]' />
          <div
            className='absolute inset-0 opacity-[0.06]'
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent' />
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
          {/* Logo + heading */}
          <div>
            <div className='inline-flex items-center gap-2 mb-6'>
              <div className='w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center'>
                <div className='w-4 h-4 rounded-md bg-gradient-to-br from-indigo-400 to-blue-400' />
              </div>
              <span className='text-white font-bold text-lg tracking-tight'>NeonMarket</span>
            </div>

            <h2 className='text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4 h-[100px] xl:h-[120px]'>
              Start building<br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400'>
                <Typewriter words={['something great.', 'your next idea.', 'the future.']} delay={2000} />
              </span>
            </h2>
            <p className='text-zinc-400 text-base leading-relaxed max-w-sm'>
              Join thousands of creators who use NeonMarket to find assets that make their work shine.
            </p>
          </div>

          {/* Perks */}
          <div className='space-y-5'>
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className='flex items-start gap-4'>
                <div className='mt-0.5 w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0'>
                  <Icon className='w-4 h-4 text-indigo-400' strokeWidth={1.8} />
                </div>
                <div>
                  <p className='text-white text-sm font-semibold mb-0.5'>{title}</p>
                  <p className='text-zinc-500 text-xs leading-relaxed'>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className='flex items-center gap-8 pt-2 border-t border-white/[0.06]'>
            {SOCIAL_PROOF.map(({ value, label }) => (
              <div key={label} className='flex flex-col gap-1'>
                <p className='text-2xl font-bold text-white'>{value}</p>
                <p className='text-xs text-zinc-500'>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className='relative z-10'>
          <div className='p-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl'>
            <div className='flex items-center gap-1 mb-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className='w-3 h-3 fill-yellow-400 text-yellow-400' />
              ))}
            </div>
            <p className='text-zinc-300 text-sm leading-relaxed italic mb-3'>
              &ldquo;NeonMarket has the best UI kits I&apos;ve ever worked with. Saved my team weeks of work.&rdquo;
            </p>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center'>
                <Users className='w-3 h-3 text-white' />
              </div>
              <p className='text-xs text-zinc-500'>Alex M. — Product Designer at Vercel</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className='flex-1 flex flex-col items-center justify-center px-6 py-12 relative'>

        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px]' />
        </div>

        <div className='relative z-10 w-full max-w-[420px]'>

          {/* Mobile logo */}
          <div className='lg:hidden mb-8 flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center'>
              <div className='w-3.5 h-3.5 rounded-md bg-gradient-to-br from-indigo-400 to-blue-400' />
            </div>
            <span className='text-white font-bold text-base tracking-tight'>NeonMarket</span>
          </div>

          {/* Heading */}
          <div className='mb-8'>
            <div className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4'>
              <Sparkles className='w-3 h-3 text-indigo-400' />
              <span className='text-xs text-indigo-300 font-medium'>Free forever plan</span>
            </div>
            <h1 className='text-3xl font-bold text-white tracking-tight mb-2'>
              Create your account
            </h1>
            <p className='text-zinc-400 text-sm'>
              Already a member?{' '}
              <Link href='/sign-in' className='text-blue-400 hover:text-blue-300 transition-colors font-medium'>
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Auth form card */}
          <div className='bg-zinc-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden'>
            <div className='px-8 py-7'>
              <SignUp
                appearance={{
                  layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                  },
                  elements: {
                    socialButtonsBlockButton: 
                      'w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 flex items-center justify-center gap-3 box-border',
                    socialButtonsIconButton: 
                      'bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 transition-all duration-200',
                    dividerRow: 'flex items-center justify-center gap-3 my-5',
                    dividerText: 'text-zinc-500 text-xs font-medium px-2',
                    dividerLine: 'bg-white/10 h-px flex-1',

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
              { Icon: ShieldCheck, label: 'Secure & Private' },
              { Icon: Download, label: 'Instant Downloads' },
              { Icon: Package, label: 'Personal Library' },
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
