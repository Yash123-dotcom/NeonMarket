# 🚀 NeonMarket - Digital Asset Marketplace

A complete, production-ready e-commerce platform for selling digital assets like UI kits, 3D models, templates, and more. Built with Next.js 14, TypeScript, Prisma, Stripe, and Clerk.

## ✨ Features

### 🛒 **E-commerce Core**

- Product catalog with search and pagination
- Shopping cart with persistent state
- Secure checkout with Stripe
- Digital file downloads with purchase verification
- Order management and history

### 👤 **User Management**

- Authentication with Clerk (sign up/sign in)
- User profiles and purchase history
- Seller accounts with Stripe Connect
- Admin dashboard for product management

### 🔒 **Security & Performance**

- Rate limiting on downloads
- Input validation with Zod
- Secure file serving
- Transaction-based order processing
- Webhook verification for payments

### 📱 **Modern UI/UX**

- Responsive design with Tailwind CSS
- Dark theme with neon accents
- Smooth animations with Framer Motion
- Toast notifications
- Loading states and error handling

### 🎯 **Advanced Features**

- Real customer reviews system
- Stock management
- Admin analytics dashboard
- Seller onboarding flow
- Email notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: Clerk
- **Payments**: Stripe + Stripe Connect
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Validation**: Zod
- **Notifications**: Sonner

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- Stripe account
- Clerk account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd my-niche-market
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in your environment variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
ADMIN_USER_ID=your_admin_user_id_here

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# App Configuration
NEXT_PUBLIC_URL=http://localhost:3000
NODE_ENV=development

# Admin Seeding (Optional)
ADMIN_SEED_TOKEN=your_secure_token_here
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed with sample data
# First, get your admin user ID from Clerk dashboard
# Then make a POST request to /api/seed with proper auth
```

### 4. Create Product Files Directory

```bash
mkdir product-files
# Add your digital asset files here (ZIP format recommended)
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your marketplace!

## 📋 Setup Guides

### Clerk Authentication Setup

1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Copy API keys to `.env`
4. Set up webhooks:
   - Endpoint: `https://yourdomain.com/api/webhooks/clerk`
   - Events: `user.created`

### Stripe Payment Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from dashboard
3. Set up webhooks:
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Enable Stripe Connect for seller payouts

### Database Setup (Neon)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `DATABASE_URL`
4. Run `npx prisma db push`

## 🏗️ Project Structure

```
my-niche-market/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart
│   ├── dashboard/         # User dashboard
│   ├── product/           # Product pages
│   ├── products/          # Product listing
│   └── ...
├── actions/               # Server actions
├── components/            # React components
├── lib/                   # Utilities
├── prisma/               # Database schema
├── product-files/        # Digital assets
└── public/               # Static files
```

## 🔧 Configuration

### Admin Access

Set your Clerk user ID as `ADMIN_USER_ID` in `.env` to access:

- `/admin` - Analytics dashboard
- `/admin/products` - Product management
- `/admin/add` - Add new products

### File Upload

Currently uses local file storage. For production, consider:

- AWS S3
- Cloudflare R2
- UploadThing (already configured)

### Email Notifications

Integrate with:

- Resend
- SendGrid
- Postmark

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Works on any platform supporting Node.js:

- Railway
- Render
- DigitalOcean App Platform

## 🔒 Security Checklist

- ✅ Environment variables secured
- ✅ API routes protected
- ✅ Input validation with Zod
- ✅ Rate limiting implemented
- ✅ Webhook signature verification
- ✅ File access controls
- ✅ Admin route protection

## 📊 Analytics & Monitoring

Consider adding:

- Vercel Analytics
- Sentry for error tracking
- PostHog for user analytics
- Stripe Dashboard for payment metrics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- Check the [Issues](https://github.com/your-repo/issues) page
- Join our [Discord](https://discord.gg/your-server)
- Email: support@neonmarket.io

## 🎯 Roadmap

- [ ] Multi-vendor marketplace
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Subscription products
- [ ] Affiliate system
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Social features

---

Built with ❤️ by the NeonMarket team
