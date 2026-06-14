import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // PWA configuration will be added via next-pwa
};

export default nextConfig;
