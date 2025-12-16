import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    
    if (!file) {
      return NextResponse.json({ error: '没有文件' }, { status: 400 });
    }

    // 这里应该调用Cloudflare R2 API
    // 实际部署时需要配置R2绑定
    
    // 模拟R2上传返回的URL
    const mockUrl = `https://r2.example.com/uploads/${Date.now()}_${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: mockUrl,
      fileName: fileName,
      size: file.size,
      type: file.type
    });
    
  } catch (error) {
    console.error('上传错误:', error);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}

export const runtime = 'nodejs'; // 重要：使用Node.js runtime