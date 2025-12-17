export const runtime = "edge";
import { R2Bucket } from '@cloudflare/workers-types';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

// 如果你在 Pages Functions 中绑定 R2
const BUCKET: R2Bucket = (globalThis as any).R2_BUCKET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: '没有文件' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: '文件过大，最大 10MB' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: '不支持的文件类型' }, { status: 400 });
    }
    
    // 安全生成文件名
    const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
    const objectKey = `uploads/${randomUUID()}.${ext}`;

    // 使用 arrayBuffer 替代 stream 避免类型冲突
    const buffer = await file.arrayBuffer();

    await BUCKET.put(objectKey, buffer, {
      httpMetadata: { contentType: file.type },
      customMetadata: { originalName: file.name },
    });

    const PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL;
    const fileUrl = `${PUBLIC_BASE_URL}/${objectKey}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      key: objectKey,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: '上传失败', message: error.message }, { status: 500 });
  }
}