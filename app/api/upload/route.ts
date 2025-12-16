// app/api/upload/route.ts
export const runtime = 'edge';
import { R2Bucket } from '@cloudflare/workers-types/experimental';
import { NextRequest, NextResponse } from 'next/server';

// 仅在开发环境中导入wrangler，生产环境打包时会排除此依赖
let getPlatformProxy: any;
if (process.env.NODE_ENV === 'development') {
  import('wrangler').then((module) => {
    getPlatformProxy = module.getPlatformProxy;
  });
}
// 定义R2存储桶的绑定名称，需与wrangler.toml配置一致
const R2_BINDING_NAME = 'MY_R2_BUCKET'; // 请将此名称替换为你的实际绑定名

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file) {
      return NextResponse.json({ error: '没有文件' }, { status: 400 });
    }

    // 1. 获取R2存储桶实例（根据环境动态获取）
    let r2Bucket: R2Bucket;
    if (process.env.NODE_ENV === 'development') {
      // 本地开发：使用getPlatformProxy获取模拟R2
      const { env } = await getPlatformProxy();
      r2Bucket = env[R2_BINDING_NAME];
    } else {
      // 线上生产：从Cloudflare Pages/Workers环境获取真实R2绑定
      // 注意：这需要你的Next.js应用部署在Cloudflare Pages上并使用适配器
      const env = (request as any).env || (request as any).ctx?.env;
      if (!env) {
        throw new Error('线上环境未找到R2绑定，请确认部署配置。');
      }
      r2Bucket = env[R2_BINDING_NAME];
    }

    // 2. 将文件转换为Buffer以便上传
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // 3. 上传到R2存储桶
    // 生成唯一对象键（路径），可以包含时间戳和文件名
    const objectKey = `uploads/${Date.now()}_${fileName || file.name}`;
    await r2Bucket.put(objectKey, buffer, {
      httpMetadata: {
        contentType: file.type || 'application/octet-stream',
      },
    });

    // 4. 构造文件的访问URL
    // 注意：R2存储桶默认私有，此URL不可直接公开访问。
    // 如需公开访问，需要配置存储桶为公开，或通过Worker生成预签名URL。
    const fileUrl = `https://pub-<your-account-id>.r2.dev/${objectKey}`; // 公开存储桶示例
    // 或者使用你的自定义域名（如果配置了R2自定义域）:
    // const fileUrl = `https://assets.yourdomain.com/${objectKey}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      objectKey: objectKey,
      fileName: fileName || file.name,
      size: file.size,
      type: file.type,
    });

  } catch (error) {
    console.error('上传错误:', error);
    return NextResponse.json({ error: '上传失败', details: (error as Error).message }, { status: 500 });
  }
}