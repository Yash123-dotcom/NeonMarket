import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
      <html lang="en" className="dark">
        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
          {children}
          <Toaster position="bottom-right" theme="system" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}