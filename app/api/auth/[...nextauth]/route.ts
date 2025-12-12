// app/api/auth/[...nextauth]/route.ts
export const runtime = 'nodejs'; // 默认可省略

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { authOptions } from "../auth-options"; // 拆分后的配置

// 创建 NextAuth 处理器
const authHandler = NextAuth(authOptions as NextAuthOptions);

// 导出 GET 和 POST 方法以支持 Edge Runtime
export { authHandler as GET, authHandler as POST };

// 可选：增加调试日志（开发环境下）
// console.log('NextAuth Edge Runtime handler initialized');
