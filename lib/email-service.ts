// lib/email-service.ts
import nodemailer from 'nodemailer';

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
}

// 创建邮件传输器
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
    secure: process.env.ZOHO_SMTP_SECURE === 'true',
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_SMTP_PASSWORD,
    },
    // 生产环境可以关闭调试
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  });
};

// 创建邮件 HTML 内容
const createEmailHTML = (application: MembershipApplication, applicationId: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Membership Application - ULA</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      text-align: center;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 12px 20px;
      margin-bottom: 25px;
    }
    .label {
      font-weight: 600;
      color: #4b5563;
      text-align: right;
    }
    .value {
      color: #111827;
      font-weight: 500;
    }
    .message-box {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 20px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .files-section {
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .file-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background: #f9fafb;
      border-radius: 6px;
      margin-bottom: 8px;
      border: 1px solid #e5e7eb;
    }
    .badge {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
      text-align: center;
    }
    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
      .label {
        text-align: left;
        font-weight: 700;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">📋 New Membership Application</h1>
    <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">
      Application ID: <strong>${applicationId}</strong>
    </p>
  </div>
  
  <div class="content">
    <div class="info-grid">
      <div class="label">Applicant:</div>
      <div class="value">${application.name}</div>
      
      <div class="label">Company:</div>
      <div class="value">${application.company}</div>
      
      <div class="label">Email:</div>
      <div class="value">
        <a href="mailto:${application.email}" style="color: #2563eb; text-decoration: none;">
          ${application.email}
        </a>
        <a href="mailto:${application.email}?subject=Regarding%20Your%20ULA%20Membership%20Application&body=Dear%20${encodeURIComponent(application.name)}," 
           style="margin-left: 10px; font-size: 12px;" class="badge">Reply</a>
      </div>
      
      <div class="label">Phone:</div>
      <div class="value">${application.phone || '<em>Not provided</em>'}</div>
      
      <div class="label">Title:</div>
      <div class="value">${application.title}</div>
      
      <div class="label">Membership Type:</div>
      <div class="value">${application.membershipType || '<em>Not specified</em>'}</div>
      
      <div class="label">Heard About ULA:</div>
      <div class="value">${application.heardFrom || '<em>Not specified</em>'}</div>
    </div>
    
    <div class="message-box">
      <strong style="display: block; margin-bottom: 10px; color: #1e40af;">📝 Message from Applicant:</strong>
      <div style="white-space: pre-line; line-height: 1.8;">${application.message}</div>
    </div>
    
    ${application.fileUrls && application.fileUrls.length > 0 ? `
    <div class="files-section">
      <strong style="display: block; margin-bottom: 15px; color: #1e40af;">
        📎 Uploaded Files (${application.fileUrls.length})
      </strong>
      ${application.fileUrls.map(url => `
        <div class="file-item">
          <span style="margin-right: 10px;">📄</span>
          <a href="${url}" target="_blank" style="flex: 1; color: #2563eb; text-decoration: none;">
            ${url.split('/').pop()}
          </a>
          <span style="font-size: 12px; color: #6b7280;">
            ${url.startsWith('https://') ? 'Cloudflare R2' : 'Uploaded file'}
          </span>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    <div class="footer">
      <p>⏰ Submitted on: ${new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })}</p>
      <p>📍 This application was submitted via the ULA website membership form.</p>
      <p style="font-size: 12px; margin-top: 15px; color: #9ca3af;">
        Application ID: ${applicationId} • Sent via Zoho International SMTP
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

// 创建纯文本内容
const createEmailText = (application: MembershipApplication, applicationId: string): string => {
  return `
NEW MEMBERSHIP APPLICATION - ULA Website

Application ID: ${applicationId}
Submitted: ${new Date().toLocaleString()}

APPLICANT DETAILS:
-----------------
Name: ${application.name}
Company: ${application.company}
Email: ${application.email}
Phone: ${application.phone || 'Not provided'}
Title: ${application.title}
Membership Type: ${application.membershipType || 'Not specified'}
Heard About ULA: ${application.heardFrom || 'Not specified'}

MESSAGE:
--------
${application.message}

${application.fileUrls && application.fileUrls.length > 0 ? `
UPLOADED FILES (${application.fileUrls.length}):
----------------------------------------------
${application.fileUrls.map((url, i) => `${i + 1}. ${url}`).join('\n')}
` : ''}

---
This application was submitted via the ULA website membership form.
Application ID: ${applicationId}
Sent via Zoho International SMTP
  `;
};

// 主发送函数
export async function sendMembershipNotification(
  application: MembershipApplication,
  applicationId: string
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    
    // 验证连接
    await transporter.verify();
    console.log('✅ Zoho SMTP connection verified');
    
    // 发送邮件
    const info = await transporter.sendMail({
      from: `"ULA Membership System" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.ZOHO_EMAIL,
      subject: `📋 New Membership Application: ${application.name} - ${application.company}`,
      html: createEmailHTML(application, applicationId),
      text: createEmailText(application, applicationId),
      // 邮件头信息
      headers: {
        'X-Application': 'ULA-Membership-Form',
        'X-Application-ID': applicationId,
        'Priority': 'High',
        'Importance': 'high',
      },
    });
    
    console.log('✅ Email notification sent successfully');
    console.log('📧 Message ID:', info.messageId);
    console.log('👤 Recipients:', info.accepted.join(', '));
    
    return true;
    
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    
    // 记录错误但不影响主流程
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: (error as any).code,
      });
    }
    
    // 抛出错误让调用者处理
    throw error;
  }
}