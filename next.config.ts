import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 基础配置
  reactStrictMode: true,
  
  // 实验性功能配置
  experimental: {
    reactCompiler: true, // React 编译器
    // 其他实验性功能
    // typedRoutes: true, // 类型化路由
    // serverActions: { bodySizeLimit: '2mb' }, // 服务器操作
  },
  
  // 开发工具配置
  turbopack: {
    root: process.cwd()
  },
  
  // 其他可选配置
  images: {
    domains: [], // 允许的图片域名
  },
  
  // 编译选项
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除 console
  },
  output: 'standalone',
};

export default nextConfig;