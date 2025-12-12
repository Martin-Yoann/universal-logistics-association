"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface UserMenuProps {
  session: Session;
}

export default function UserMenu({ session }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitial = () => {
    return session.user?.name?.charAt(0).toUpperCase() || "U";
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 头像按钮 */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="用户菜单"
  className="
    group
    relative w-10 h-10
    flex items-center justify-center
    select-none
    rounded-full
    p-0
    bg-transparent
    border-0
    outline-none
    focus:outline-none
    hover:outline-none
    border-radius:50%;
  "
>

  {/* 外层可控框：决定边框和 hover 效果 */}
  <div
    className="
      absolute inset-0 
      rounded-full 
      border border-gray-300
      group-hover:border-blue-500
      transition-colors duration-200
    "
  ></div>

  {/* 头像背景层：确保无论有没有头像都不会透明看穿 */}
  <div
    className="
      absolute inset-0
      rounded-full
      bg-gray-200
      overflow-hidden
    "
  >
    {session.user?.image ? (
      <img
        src={session.user.image}
        alt={session.user.name || 'User'}
        className="
          w-full h-full object-cover
          rounded-full
        "
      />
    ) : (
      <div
        className="
          w-full h-full
          flex items-center justify-center
          bg-gradient-to-br from-blue-400 to-blue-600
          text-white font-bold
          rounded-full
        "
      >
        {getUserInitial()}
      </div>
    )}
  </div>
</button>



      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right- -16 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {/* 用户信息 */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session.user?.name || "User"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {session.user?.email}
            </p>
          </div>

          {/* 菜单项 */}
          <div className="py-1">
            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              仪表板
            </a>
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              个人资料
            </a>
          </div>

          {/* 退出登录 */}
          <div className="border-t pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
}