import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 检查文件类型
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // 创建唯一文件名
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 在生产环境中，你应该上传到云存储（如 AWS S3, Cloudinary 等）
    const filename = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), "public", "uploads", "avatars", filename);
    
    // 确保目录存在
    // 在实际应用中，这里应该上传到云存储
    // await writeFile(path, buffer);

    // 返回图片URL（这里返回示例URL）
    const imageUrl = `/uploads/avatars/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: "Avatar uploaded successfully"
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}