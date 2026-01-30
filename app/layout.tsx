import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Clean, Apple-like sans-serif
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

// Main font (Apple style substitute)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "NeonMarket | Premium Digital Assets",
  description: "The #1 marketplace for high-quality UI kits, icons, and templates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          {children}
          <Toaster position="bottom-right" theme="system" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}