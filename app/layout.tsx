// app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Fotter"; // 注意这里可能是拼写错误，应该是 Footer
import StyledComponentsRegistry from "./antd-registry";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Universal Logistics Association",
  description: "Making a difference through collective action",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider> {/* 这里已经包含了 ClerkProvider */}
          <StyledComponentsRegistry>
            <div className="flex flex-col min-h-screen">
              {/* 导航栏 - 固定定位 */}
              <nav className="fixed top-0 left-0 right-0 z-50 h-16">
                <Navigation />
              </nav>

              {/* 为导航栏预留空间的主内容区 */}
              <div className="flex-grow pt-0"> {/* 添加 pt-16 为固定导航栏留出空间 */}
                <main className="min-h-[calc(100vh-16rem)]">
                  {children}
                </main>
              </div>

              {/* 页脚 - 自动置于底部 */}
              <Footer />
            </div>
          </StyledComponentsRegistry>
        </ClerkProvider>
      </body>
    </html>
  );
}