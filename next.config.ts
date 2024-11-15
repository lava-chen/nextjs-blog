import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    // logging: true, // 启用日志
  },
  /* config options here */
};

export default nextConfig;
