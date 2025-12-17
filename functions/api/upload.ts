import { NextRequest, NextResponse } from "next/server";

// 使用 Edge Runtime（Cloudflare Workers）
export const runtime = "edge";

// 修复：正确获取 R2 Bucket 实例
// 注意：在 Cloudflare Workers 中，R2 绑定通常通过环境变量访问
const getR2Bucket = () => {
  // @ts-ignore - Cloudflare Workers 全局绑定
  return process.env.R2_BUCKET_NAME ? R2_BUCKET : null;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const text = formData.get("text") as string;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // 获取 R2 存储桶实例
    const bucket = getR2Bucket();
    if (!bucket) {
      return NextResponse.json({ error: "R2 bucket not configured" }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileName = file.name;

    // 上传到 R2
    await bucket.put(fileName, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });

    return NextResponse.json({
      message: "Upload successful",
      text,
      fileUrl: `https://${process.env.R2_BUCKET_DOMAIN}/${fileName}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}