import { NextRequest, NextResponse } from "next/server";

// ⚠️ Cloudflare Pages 不要使用 nodejs runtime
// export const runtime = "nodejs";

// 模拟数据库更新函数
async function updateUserProfile(email: string, data: any) {
  // TODO: 这里对接真实数据库（Prisma / Supabase / MongoDB）
  return { ...data, email };
}

export async function PUT(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    const allowedFields = [
      "name",
      "phone",
      "address",
      "bio",
      "website",
      "location",
    ];

    // 只允许白名单字段更新
    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    // 更新用户
    const updatedUser = await updateUserProfile(email, updateData);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
