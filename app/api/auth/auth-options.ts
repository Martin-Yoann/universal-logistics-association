// app/api/auth/auth-options.ts
import type { NextAuthOptions } from "@next-auth/edge";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Edge Runtime 必须使用 JWT
  session: {
    strategy: "jwt",
  },
  // 必须设置 secret
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // 可以继续添加更多 OAuth 提供商
  ],

  // 可选：调试信息（开发环境下）
  debug: process.env.NODE_ENV === "development",

  // JWT 配置（可自定义）
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },

  // 可选回调函数
  callbacks: {
    async jwt({ token, user, account }) {
      // 第一次登录，把 user 信息加入 token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // 把 token 信息暴露到 session
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
      };
      return session;
    },
  },
};
