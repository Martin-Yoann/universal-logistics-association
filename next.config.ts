import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 基础配置
  reactStrictMode: true,
  output: 'standalone',
  
  // 实验性功能配置
  experimental: {
    reactCompiler: true,
    // 移除了不支持的 crossOriginIsolated 属性
  },

  // 其余配置保持不变...
  
  // 针对 Cloudflare Pages 的 Webpack 配置（关键部分）
  webpack: (config, { isServer, dev, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        fs: false,
        os: false,
        http: false,
        https: false,
        zlib: false,
        net: false,
        tls: false,
        child_process: false,
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }

    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/nodemailer/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    });

    return config;
  },

  env: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV || 'development',
  },

  images: {
    domains: [],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
};

export default nextConfig;