"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import UserMenu from "../components/user";
const navItems = [
  { name: "Home", path: "/" },
  { name: "Programs", path: "../routes/Programs" },
  { name: "Membership", path: "../routes/membership" },
  { name: "Insights", path: "../routes/Insightsr" },
  { name: "Events", path: "../routes/events" },
  { name: "Contact Us", path: "../routes/Contact" },
  { name: "About Us", path: "../routes/about" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // 使用 NextAuth 的 useSession 获取用户会话状态
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 显示加载状态
  if (status === "loading") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* 简化的加载状态导航栏 */}
        <div className="container mx-auto px-4 pt-4">
          <div className="flex justify-between items-center h-20 font-martel rounded-2xl px-8 bg-white/30 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse"></div>
              <span className="text-2xl font-bold text-gray-900"></span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="animate-pulse bg-gray-200 rounded-xl px-6 py-3"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // 用户已登录时的显示
  const isAuthenticated = session?.user;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* 浮动导航容器 */}
        <div
          className={`container mx-auto px-4 transition-all duration-300 ${
            scrolled
              ? "pt-4" // 滚动时减少顶部间距
              : "pt-8" // 初始状态更多间距
          }`}
        >
          <div
            className={`flex justify-between items-center h-20 font-martel rounded-2xl px-8 transition-all duration-500 ${
              scrolled
                ? "bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/30"
                : "bg-white/30 backdrop-blur-sm"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link href="/routes/home" className="inline-block">
                <img className="w-50 h-20" src="/ULA-logo.svg" alt="ULA Logo" />
              </Link>
            </div>
            {/* 导航菜单 */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition duration-300 text-lg tracking-wide relative ${
                    pathname === item.path
                      ? "text-blue-600 font-extrabold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full"
                      : "text-gray-800 hover:text-blue-600 font-semibold hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-blue-600/50 hover:after:rounded-full"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 用户状态按钮 */}
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                // 用户已登录 - 显示用户信息和登出按钮
                <div className="flex items-center space-x-4">
                  {/* 用户信息 */}
                  <UserMenu session={session} />

                  {/* 加入我们 按钮 */}
                  <Link href="/routes/Join">
                      <button
                        className="flex items-center justify-center px-8 py-3 
                   bg-gradient-to-r from-blue-600 to-blue-500 
                   hover:from-blue-700 hover:to-blue-600 
                   text-white rounded-xl shadow-lg hover:shadow-xl 
                   transition-all duration-300 font-bold"
                      >
                        Join Today
                      </button>
                    </Link>
                </div>
              ) : (
                // 用户未登录 - 显示登录按钮
                <>
                  <div className="flex space-x-4">
                    {/* 浅灰色毛玻璃按钮 - Sign In */}
                    {/* 半透明毛玻璃按钮 - Sign In */}
                    <button
                      onClick={() => signIn()}
                      className="flex items-center justify-center px-8 py-3 
             bg-white/20 backdrop-blur-md text-gray-800 
             hover:text-blue-600 hover:blue-700
             rounded-xl shadow-lg hover:shadow-xl 
             transition-all duration-300 font-semibold cursor-pointer border border-white/30"
                    >
                      <span className="text-lg">Sign In</span>
                      <div className="p-2.5 rounded-xl hidden md:block"></div>
                    </button>

                    {/* 蓝色渐变按钮 - Join Today */}
                    <Link href="/routes/Join">
                      <button
                        className="flex items-center justify-center px-8 py-3 
                   bg-gradient-to-r from-blue-600 to-blue-500 
                   hover:from-blue-700 hover:to-blue-600 
                   text-white rounded-xl shadow-lg hover:shadow-xl 
                   transition-all duration-300 font-bold"
                      >
                        Join Today
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* 为固定导航栏预留的空间 */}
      <div className="h-32"></div> {/* 根据你的导航栏实际高度调整 */}
    </>
  );
}
