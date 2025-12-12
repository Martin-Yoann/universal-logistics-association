export const runtime = 'edge';



import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, phone, address, bio, website, location } = body;

    // 在这里更新数据库中的用户信息
    // 示例：使用你的数据库客户端
    // const updatedUser = await db.user.update({
    //   where: { email: session.user.email },
    //   data: {
    //     name,
    //     phone,
    //     address,
    //     bio,
    //     website,
    //     location,
    //     updatedAt: new Date(),
    //   },
    // });

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name,
        email,
        phone,
        address,
        bio,
        website,
        location,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}