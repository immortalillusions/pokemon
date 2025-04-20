import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allow it to get images from the poke API
  images: {
    domains: ["raw.githubusercontent.com"], 
  },
};

export default nextConfig;
