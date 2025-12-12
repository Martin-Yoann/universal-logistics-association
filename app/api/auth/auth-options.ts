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
        email: { 
          label: "Email", 
          type: "email", 
          placeholder: "user@example.com" 
        },
        password: { 
          label: "Password", 
          type: "password" 
        }
      },
      async authorize(credentials) {
        try {
          console.log('Login attempt:', credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          const user = userStore.verifyUser(credentials.email, credentials.password);

          if (!user) {
            console.log('User not found or password incorrect');
            return null;
          }

          console.log('User authorized:', user.email);
          
          // 返回包含自定义属性的用户对象
          return {
            id: user.id,
            name: user.name || null,
            email: user.email || null,
            image: user.image || null,
            role: user.role || null,
          };
        } catch (error: any) {
          console.error("Authorization error:", error.message);
          return null;
        }
      }
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 使用类型断言，因为现在我们已经扩展了User类型
        const typedUser = user as typeof user & { role?: string | null; image?: string | null };
        token.id = typedUser.id;
        token.role = typedUser.role || null;
        token.image = typedUser.image || null;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | null;
        session.user.image = token.image as string | null;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      if (url.includes('/api/auth/signin') || url.includes('/login')) {
        return `${baseUrl}/profile`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  
  secret: process.env.NEXTAUTH_SECRET || "your-test-secret-key-for-development",
  
  debug: true,
};