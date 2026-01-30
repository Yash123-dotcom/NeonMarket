# 📘 NeonMarket: Project Manual

**NeonMarket** is a fully functional, peer-to-peer (P2P) digital asset marketplace. It allows users to buy and sell high-quality digital goods (UI kits, 3D models, code templates) securely.

---

## 🏗️ What This Site Does

### 1. Peer-to-Peer Marketplace
Unlike a standard e-commerce store where *you* sell everything, NeonMarket is an **Asset Store Platform** (like Unity Asset Store or Gumroad).
- **Anyone can be a Seller**: Users sign up, onboard via Stripe, and list their own products.
- **Anyone can be a Buyer**: Users browse the catalog, add items to cart, and purchase.

### 2. Business Model (How You Make Money)
The platform takes a **10% Commission** on every sale automatically.
- **Example**: A seller lists an item for **$100**.
- **Customer Pays**: $100.
- **Seller Gets**: $90 (90%) - Sent directly to their connected bank account.
- **Platform Gets**: $10 (10%) - Sent to your Stripe Admin account.

### 3. Key Features
- **Secure File Hosting**: Sellers upload large files (Zip, PDF) via drag-and-drop. They are stored securely and only released to verified buyers.
- **Instant Payouts**: Powered by Stripe Connect.
- **Engagement**: Real-time notifications for sales, product reviews, and 3D interactive UI.

---

## ⚙️ How It Works (Technical Flows)

### 🛒 Buying Flow
1.  **Browse**: User views products on `/products`.
2.  **Cart**: Adds items to a local cart (persisted in browser).
3.  **Checkout**: 
    - Clicks "Secure Checkout".
    - System verifies stock.
    - Creates a **Stripe Session** with metadata (product IDs, user ID).
4.  **Payment**: User pays on Stripe's secure page.
5.  **Fulfillment**: 
    - Stripe sends a `webhook` to our server.
    - Server creates an `Order` in the database.
    - Server sends a **Notification** to the user ("Order Confirmed").
6.  **Download**: User goes to dashboard, clicks "Download". API verifies purchase and streams the file.

### 💰 Selling Flow
1.  **Onboarding**: User clicks "Become a Seller" -> Redirects to Stripe Express to verify identity/bank.
2.  **Creation**: User goes to "My Products" -> "Add New".
3.  **Upload**: Uploads Thumbnail + Product File (via UploadThing).
4.  **Listing**: Product goes live immediately.

---

## 🛠️ Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** (App Router) | High-performance React framework. |
| **Styling** | **Tailwind CSS** | "Neon" aesthetic, dark mode, glassmorphism. |
| **Database** | **SQLite** (Local) / **Prisma** | manage Data (Users, Products, Orders). |
| **Auth** | **Clerk** | Secure User Management (Login/Signup). |
| **Payments** | **Stripe Connect** | Complex split-payments and marketplace logic. |
| **Uploads** | **UploadThing** | Secure cloud file storage. |

---

## ⚠️ Troubleshooting (Current Status)

If you see **"Clock Skew"** or **"Clerk Keys Do Not Match"** errors in your terminal:

1.  **The Cause**: Your `.env` file contains incorrect or expired API keys for Clerk.
2.  **The Fix**:
    - Go to [dashboard.clerk.com](https://dashboard.clerk.com).
    - Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
    - Paste them into your `.env` file.
    - **Restart the server** (`Ctrl+C` then `npm run dev`).

This is required for the "Login" and "Sign Up" features to work.
