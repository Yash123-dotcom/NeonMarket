import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be PUBLIC (accessible without login)
const isPublicRoute = createRouteMatcher([
  '/', // Homepage
  '/products(.*)', // Products pages
  '/product(.*)', // Product pages
  '/api/seed', // Seeder (now secured with auth check)
  '/api/webhooks(.*)', // Stripe & Clerk Webhooks (CRITICAL: External services need access!)
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // Protect everything else (Dashboard, Admin, Cart, etc.)
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
