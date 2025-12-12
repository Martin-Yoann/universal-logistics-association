// app/api/auth/[...nextauth]/route.ts
export const runtime = 'edge';

import NextAuth from "next-auth";
import { authOptions } from "../auth-options"; // 导入拆分后的配置

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };