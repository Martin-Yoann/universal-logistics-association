// app/api/upload/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

/* -------------------- env utils -------------------- */
function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/* -------------------- R2 client -------------------- */
const r2 = new S3Client({
  region: 'auto', // Cloudflare R2 推荐 'auto'
  endpoint: requiredEnv('R2_ENDPOINT'), // 注意：不要用 r2.dev 公共开发 URL
  credentials: {
    accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
    secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
  },
});

/* -------------------- config -------------------- */
const BUCKET_NAME = requiredEnv('R2_BUCKET_NAME');
const PUBLIC_BASE_URL = requiredEnv('R2_PUBLIC_BASE_URL'); // 生产环境可以是自定义域
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

/* -------------------- handler -------------------- */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: '没有文件' }, { status: 400 });
    }

    // 文件大小限制
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: '文件过大，最大 10MB' }, { status: 400 });
    }

    // MIME 校验
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: '不支持的文件类型' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 安全生成扩展名
    const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
    const objectKey = `uploads/${randomUUID()}.${ext}`;

    // 上传到 R2
    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: objectKey,
        Body: buffer,
        ContentType: file.type,
        CacheControl: 'public, max-age=31536000',
      })
    );

    // 返回上传后的可访问 URL
    return NextResponse.json({
      success: true,
      url: `${PUBLIC_BASE_URL}/${objectKey}`,
      key: objectKey,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '上传失败', message: error.message },
      { status: 500 }
    );
  }
}
