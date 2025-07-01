import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vvdxwhovmloehbfizuos.supabase.co",
        pathname: "**", // allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
