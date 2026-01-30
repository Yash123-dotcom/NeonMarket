import { SignIn } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <Navbar />

      {/* Background Glow */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]' />
        <div className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]' />
      </div>

      <div className='flex-1 flex items-center justify-center relative z-10 pt-20 px-6'>
        <div className='w-full max-w-md'>
          {/* Welcome Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-black text-white mb-2'>
              Welcome to{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'>
                NeonMarket
              </span>
            </h1>
            <p className='text-gray-400'>
              Sign in to access your digital assets and start building amazing projects
            </p>
          </div>

          {/* Sign In Component */}
          <SignIn
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
              New to NeonMarket?{' '}
              <Link
                href='/sign-up'
                className='text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300'
              >
                Create an account
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

          {/* Features Preview */}
          <div className='mt-12 grid grid-cols-3 gap-4 text-center'>
            <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
              <div className='w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
                <span className='text-purple-400 text-lg'>⚡</span>
              </div>
              <p className='text-xs text-gray-400'>Instant Downloads</p>
            </div>
            <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
              <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
                <span className='text-blue-400 text-lg'>🔒</span>
              </div>
              <p className='text-xs text-gray-400'>Secure Payments</p>
            </div>
            <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
              <div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
                <span className='text-green-400 text-lg'>📚</span>
              </div>
              <p className='text-xs text-gray-400'>Your Library</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
