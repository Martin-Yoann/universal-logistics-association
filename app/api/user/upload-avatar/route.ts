// 适用于 Edge Runtime
export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// 这里假设你有一个云存储上传函数，比如 S3 / Cloudinary / Upstash 等
async function uploadToStorage(file: File, filename: string): Promise<string> {
  // 示例：假设直接返回一个 URL，实际要调用云存储 SDK
  return `https://cdn.example.com/uploads/avatars/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    // 获取用户会话
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 文件类型检查
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // 创建唯一文件名
    const filename = `${Date.now()}-${file.name}`;

    // 将文件上传到云存储
    const imageUrl = await uploadToStorage(file, filename);

    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: "Avatar uploaded successfully"
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
