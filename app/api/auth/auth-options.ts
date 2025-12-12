// app/api/auth/auth-options.ts
export const runtime = 'edge';

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userStore } from '@/lib/users';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          // 校验用户
          const user = userStore.verifyUser(credentials.email, credentials.password);
          if (!user) {
            console.log('Invalid credentials for:', credentials.email);
            return null;
          }

          console.log('User authorized:', user.email);

          // 返回用户对象，可扩展属性如 role/image
          return {
            id: user.id,
            name: user.name ?? null,
            email: user.email ?? null,
            image: user.image ?? null,
            role: user.role ?? null,
          };
        } catch (error: any) {
          console.error("Authorization error:", error.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as typeof user & { role?: string | null; image?: string | null };
        token.id = typedUser.id;
        token.role = typedUser.role ?? null;
        token.image = typedUser.image ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | null;
        session.user.image = token.image as string | null;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // 登录后重定向到 profile 页面
      if (url.includes('/api/auth/signin') || url.includes('/login')) {
        return `${baseUrl}/profile`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },

  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-key",
  debug: process.env.NODE_ENV !== "production",
};
