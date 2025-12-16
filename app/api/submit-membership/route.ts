// app/api/submit-membership/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendMembershipNotification } from '@/lib/email-service';

interface MembershipApplication {
    name: string;
    company: string;
    email: string;
    phone?: string;
    title: string;
    membershipType?: string;
    message: string;
    heardFrom?: string;
    fileUrls?: string[];
    submittedAt?: string;
}

export async function POST(request: NextRequest) {
    try {
        const applicationData: MembershipApplication = await request.json();

        console.log('📝 Processing new membership application...');

        // 验证必需字段
        type RequiredField = keyof Pick<
            MembershipApplication,
            'name' | 'company' | 'email' | 'title' | 'message'
        >;

        const requiredFields: RequiredField[] = ['name', 'company', 'email', 'title', 'message'];
        const missingFields = requiredFields.filter(field => !applicationData[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // 生成唯一申请ID
        const applicationId = `ULA-APP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // 添加提交时间
        applicationData.submittedAt = applicationData.submittedAt || new Date().toISOString();

        // 开发环境：模拟保存到数据库
        if (process.env.NODE_ENV === 'development') {
            console.log('💻 [DEV] Application would be saved to Cloudflare D1:', {
                id: applicationId,
                ...applicationData
            });

            // 开发环境也发送邮件
            try {
                await sendMembershipNotification(applicationData, applicationId);
                console.log('✅ [DEV] Email notification sent');
            } catch (emailError) {
                console.warn('⚠️ [DEV] Email notification failed (continuing):', emailError);
            }

            return NextResponse.json({
                success: true,
                message: 'Application received (development mode)',
                applicationId,
                submittedAt: applicationData.submittedAt,
                note: 'In production, this will be saved to Cloudflare D1 database'
            });
        }

        // 生产环境：保存到 Cloudflare D1
        console.log('🚀 [PROD] Saving application to Cloudflare D1...');

        // 注意：D1 绑定只在 Cloudflare Pages 环境中可用
        const env = (request as any).env;
        let dbSaved = false;

        if (env?.DB) {
            try {
                const db = env.DB;

                // 保存到 D1 数据库
                await db.prepare(`
          INSERT INTO membership_applications (
            id, name, company, email, phone, title, 
            membership_type, message, heard_from, file_urls, submitted_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
                    applicationId,
                    applicationData.name,
                    applicationData.company,
                    applicationData.email,
                    applicationData.phone || null,
                    applicationData.title,
                    applicationData.membershipType || null,
                    applicationData.message,
                    applicationData.heardFrom || null,
                    applicationData.fileUrls ? JSON.stringify(applicationData.fileUrls) : null,
                    applicationData.submittedAt
                ).run();

                console.log('✅ [PROD] Application saved to D1 database');
                dbSaved = true;

            } catch (dbError) {
                console.error('❌ [PROD] Failed to save to D1:', dbError);
                // 继续发送邮件，即使数据库保存失败
            }
        } else {
            console.warn('⚠️ D1 database binding not available');
        }

        // 发送邮件通知
        console.log('📧 Sending email notification...');
        let emailSent = false;

        try {
            await sendMembershipNotification(applicationData, applicationId);
            emailSent = true;
            console.log('✅ Email notification sent successfully');
        } catch (emailError) {
            console.error('❌ Email notification failed:', emailError);
            // 邮件失败不影响主流程
        }

        // 返回成功响应
        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            applicationId,
            submittedAt: applicationData.submittedAt,
            savedToDatabase: dbSaved,
            emailSent: emailSent
        });

    } catch (error) {
        console.error('❌ Application submission error:', error);

        return NextResponse.json(
            {
                error: 'Failed to submit application',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// 注意：不要设置 runtime，让 next-on-pages 处理
// export const runtime = 'nodejs';