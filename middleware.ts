import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    // 添加其他需要保护的路径
  ],
};