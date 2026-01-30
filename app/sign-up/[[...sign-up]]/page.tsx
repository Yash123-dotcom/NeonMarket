import { SignUp } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <Navbar />

      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]' />
        <div className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]' />
      </div>

      <div className='flex-1 flex items-center justify-center relative z-10 pt-20 px-6'>
        <div className='w-full max-w-md'>
          {/* Welcome Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-black text-white mb-2'>
              Join{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'>
                NeonMarket
              </span>
            </h1>
            <p className='text-gray-400'>
              Create your account and get access to premium digital assets
            </p>
          </div>

          {/* Sign Up Component */}
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-none shadow-lg shadow-purple-500/25 transition-all duration-300',
                card: 'bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-2xl',
                headerTitle: 'text-white text-xl font-bold',
                headerSubtitle: 'text-gray-400',
                socialButtonsBlockButton:
                  'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm',
                socialButtonsBlockButtonText: 'text-white font-medium',
                dividerLine: 'bg-gray-700',
                dividerText: 'text-gray-500',
                formFieldLabel: 'text-gray-300 font-medium',
                formFieldInput:
                  'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 transition-colors duration-300 backdrop-blur-sm',
                footerActionLink:
                  'text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300',
                identityPreviewText: 'text-gray-300',
                identityPreviewEditButton: 'text-purple-400 hover:text-purple-300',
              },
            }}
          />

          {/* Additional Info */}
          <div className='mt-8 text-center'>
            <p className='text-gray-500 text-sm mb-4'>
              Already have an account?{' '}
              <Link
                href='/sign-in'
                className='text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300'
              >
                Sign in here
              </Link>
            </p>

            <div className='flex items-center justify-center gap-6 text-xs text-gray-600'>
              <Link href='/products' className='hover:text-gray-400 transition-colors'>
                Browse Products
              </Link>
              <span>•</span>
              <Link href='/' className='hover:text-gray-400 transition-colors'>
                Back to Home
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className='mt-12 space-y-4'>
            <h3 className='text-white font-bold text-center mb-6'>What you get with NeonMarket:</h3>

            <div className='space-y-3'>
              <div className='flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10'>
                <div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center'>
                  <span className='text-green-400 text-sm'>✓</span>
                </div>
                <div>
                  <p className='text-white text-sm font-medium'>Instant Downloads</p>
                  <p className='text-gray-400 text-xs'>Get your files immediately after purchase</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10'>
                <div className='w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center'>
                  <span className='text-purple-400 text-sm'>📚</span>
                </div>
                <div>
                  <p className='text-white text-sm font-medium'>Personal Library</p>
                  <p className='text-gray-400 text-xs'>Access all your purchases anytime</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10'>
                <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center'>
                  <span className='text-blue-400 text-sm'>💎</span>
                </div>
                <div>
                  <p className='text-white text-sm font-medium'>Premium Quality</p>
                  <p className='text-gray-400 text-xs'>Curated digital assets from top creators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
