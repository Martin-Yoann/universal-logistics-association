// app/api/auth/auth-options.ts
export const runtime = 'nodejs';

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// 确保环境变量存在，否则直接报错
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
if (!NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable");
}
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables");
}

// 扩展 JWT Token 类型
interface MyToken {
  id?: string;
  email?: string;
  [key: string]: any;
}

export const authOptions: NextAuthOptions = {
  // 使用 JWT
  session: {
    strategy: "jwt",
  },
  secret: NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],

  debug: process.env.NODE_ENV === "development",

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },

  callbacks: {
    // 在 JWT 中存储用户信息
    async jwt({ token, user }) {
      const t = token as MyToken;
      if (user) {
        t.id = (user as any).id ?? "";
        t.email = user.email ?? "";
      }
      return t;
    },
    // 在 session 中返回用户信息
    async session({ session, token }) {
      const t = token as MyToken;
      session.user = {
        ...session.user,
        id: t.id ?? "",
        email: t.email ?? "",
      };
      return session;
    },
  },
};
