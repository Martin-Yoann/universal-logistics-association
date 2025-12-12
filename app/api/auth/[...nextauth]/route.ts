export const runtime = 'edge';

import NextAuth from "@next-auth/edge";
import type { NextAuthOptions } from "@next-auth/edge";
import { authOptions } from "../auth-options";

const authHandler = NextAuth(authOptions as NextAuthOptions);

export { authHandler as GET, authHandler as POST };
