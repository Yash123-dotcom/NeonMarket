/** @type {import('next').NextConfig} */
const nextConfig = {
  // We can add image domains here later if needed
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;