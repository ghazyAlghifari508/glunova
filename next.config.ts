import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'tqvnqccgakoytdrgjqkv.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/booking',
        destination: '/konsultasi-dokter',
        permanent: true,
      },
      {
        source: '/doctors',
        destination: '/konsultasi-dokter',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
