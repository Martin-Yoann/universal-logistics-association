export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// 模拟数据库更新函数
async function updateUserProfile(email: string, data: any) {
  // 这里你可以对接真实数据库，例如 Prisma / Supabase / MongoDB
  // 返回更新后的用户数据
  return { ...data, email };
}

export async function PUT(request: NextRequest) {
  try {
    // 获取用户 session
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 解析请求体
    const body = await request.json();
    const allowedFields = ["name", "phone", "address", "bio", "website", "location"];
    
    // 只取允许更新的字段，防止前端恶意修改
    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) updateData[key] = body[key];
    }

    // 模拟更新数据库
    const updatedUser = await updateUserProfile(session.user.email, updateData);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
