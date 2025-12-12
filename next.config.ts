import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    reactCompiler: true,
    outputFileTracingRoot: process.cwd(),
  },

  turbopack: {
    root: process.cwd(),
  },

  images: {
    domains: ["images.unsplash.com"], // 可按需添加域名
  },

  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },

  output: "standalone",
  trailingSlash: false,
};

export default nextConfig;
