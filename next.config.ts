import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        // Vercel Blob serves each store from a random per-store subdomain
        // (e.g. fxkwv9qn6m8lrc7q.public.blob.vercel-storage.com), so this
        // needs a wildcard rather than one fixed hostname.
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
