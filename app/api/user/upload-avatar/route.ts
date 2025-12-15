export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";

// 云存储上传函数（示例）
async function uploadToStorage(file: File, filename: string): Promise<string> {
  return `https://cdn.example.com/uploads/avatars/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be an image" },
        { status: 400 }
      );
    }

    const filename = `${Date.now()}-${file.name}`;
    const imageUrl = await uploadToStorage(file, filename);

    return NextResponse.json({
      success: true,
      url: imageUrl,
      redirectTo: "/profile", // 👈 告诉前端该跳哪
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
