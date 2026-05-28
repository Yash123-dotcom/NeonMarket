# NeonMarket - Digital Asset Marketplace

NeonMarket is a complete, production-ready e-commerce platform designed for selling digital assets such as UI kits, 3D models, templates, and software. Built on modern web technologies including Next.js 14, TypeScript, Prisma, Stripe, and Clerk.

## Features

### E-commerce Core
- Product catalog with search and pagination capabilities
- Shopping cart with persistent state management
- Secure checkout process powered by Stripe
- Digital file downloads with automated purchase verification
- Comprehensive order management and history tracking

### User Management
- Secure authentication via Clerk (sign up/sign in)
- User profiles and detailed purchase history
- Seller accounts integrated with Stripe Connect
- Administrative dashboard for comprehensive product management

### Security & Performance
- Rate limiting implemented on file downloads
- Strict input validation utilizing Zod
- Secure file serving architecture
- Transaction-based order processing pipeline
- Webhook verification for secure payment handling

### User Interface
- Responsive design crafted with Tailwind CSS
- Professional dark theme with customizable accents
- Hardware-accelerated animations using Framer Motion
- Integrated toast notifications for user feedback
- Robust loading states and error handling mechanisms

### Advanced Functionality
- Verified customer reviews system
- Automated stock management
- Administrative analytics and reporting dashboard
- Streamlined seller onboarding flow
- Automated email notifications

## Technology Stack

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

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Stripe account for payment processing
- Clerk account for authentication

### 1. Installation

```bash
git clone <your-repo-url>
cd my-niche-market
npm install
```

### 2. Environment Configuration

Copy the example environment variables file:

```bash
cp .env.example .env
```

Configure the following environment variables in `.env`:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Authentication Configuration (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
ADMIN_USER_ID=your_admin_user_id_here

# Payment Configuration (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_URL=http://localhost:3000
NODE_ENV=development

# Admin Seeding (Optional)
ADMIN_SEED_TOKEN=your_secure_token_here
```

### 3. Database Initialization

```bash
# Generate the Prisma client
npx prisma generate

# Apply the schema to the database
npx prisma db push
```

### 4. Configure Digital Assets

Create a directory for storing product files:

```bash
mkdir product-files
# Add digital asset files here (ZIP format recommended)
```

### 5. Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` to access the local development environment.

## Configuration Guides

### Authentication Setup (Clerk)
1. Register an account at clerk.com.
2. Create a new application.
3. Transfer the provided API keys to your `.env` file.
4. Configure webhooks:
   - Endpoint URL: `https://yourdomain.com/api/webhooks/clerk`
   - Subscribed Events: `user.created`

### Payment Gateway Setup (Stripe)
1. Register an account at stripe.com.
2. Retrieve API keys from the developer dashboard.
3. Configure webhooks:
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Subscribed Events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Enable Stripe Connect to facilitate seller payouts.

### Database Setup (Neon)
1. Register an account at neon.tech.
2. Create a new project instance.
3. Copy the provided connection string to the `DATABASE_URL` variable.
4. Execute `npx prisma db push` to initialize the schema.

## Project Structure

```text
my-niche-market/
├── app/                    # Next.js App Router directory
│   ├── admin/             # Administrator dashboard interface
│   ├── api/               # Serverless API routes
│   ├── cart/              # Shopping cart logic and UI
│   ├── dashboard/         # End-user dashboard
│   ├── product/           # Individual product view
│   ├── products/          # Product listing catalog
│   └── ...
├── actions/               # Server-side actions
├── components/            # Reusable React components
├── lib/                   # Utility functions and shared logic
├── prisma/               # Database schema definition
├── product-files/        # Directory for digital assets
└── public/               # Static assets
```

## Administration and Management

### Administrative Access
Define the `ADMIN_USER_ID` in your `.env` file matching your Clerk user ID to gain access to:
- `/admin` - Core analytics dashboard
- `/admin/products` - Product catalog management
- `/admin/add` - Product creation interface

### File Storage Infrastructure
The current configuration utilizes local file storage. For production environments, consider migrating to:
- AWS S3
- Cloudflare R2
- UploadThing (pre-configured support included)

### Email Infrastructure
The platform can be integrated with standard email providers:
- Resend
- SendGrid
- Postmark

## Deployment Procedures

### Recommended Approach: Vercel
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into the Vercel dashboard.
3. Configure the required environment variables.
4. Initiate deployment.

### Alternative Platforms
The application is compatible with any platform supporting Node.js runtime environments:
- Railway
- Render
- DigitalOcean App Platform

## Security Controls

The following security measures have been implemented:
- Environment variables secured against client exposure
- Server-side API routes protected via authentication middleware
- Strict input validation enforced utilizing Zod
- Rate limiting implemented on critical endpoints
- Webhook signature verification mandatory for external services
- File access controls restricting unauthorized downloads
- Dedicated route protection for administrative interfaces

## Monitoring and Analytics

For production deployments, consider integrating:
- Vercel Analytics for performance metrics
- Sentry for robust error tracking and diagnostics
- PostHog for detailed user behavior analytics
- Stripe Dashboard for comprehensive payment metrics

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your modifications
4. Include necessary tests
5. Submit a pull request for review

## License
This project is licensed under the MIT License. Please refer to the LICENSE file for more information.

## Support
- Review the issue tracker for known problems or feature requests.
- Contact the support team via email at support@neonmarket.io.

## Development Roadmap
- [ ] Implement multi-vendor marketplace functionality
- [ ] Develop advanced analytics reporting
- [ ] Build companion mobile application
- [ ] Introduce subscription-based product support
- [ ] Create affiliate marketing system
- [ ] Enhance search with advanced filtering capabilities
- [ ] Add user wishlist functionality
- [ ] Integrate social sharing and interaction features
