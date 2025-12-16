import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 这里应该保存到Cloudflare D1数据库
    // const db = (request as any).env?.DB;
    // await db.prepare('INSERT INTO membership_applications ...').run(data);
    
    console.log('收到会员申请:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: '申请已收到',
      applicationId: `app_${Date.now()}`
    });
    
  } catch (error) {
    console.error('提交错误:', error);
    return NextResponse.json({ error: '提交失败' }, { status: 500 });
  }
}

export const runtime = 'nodejs';