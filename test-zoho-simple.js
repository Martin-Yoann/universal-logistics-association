// test-zoho-international.js
const nodemailer = require('nodemailer');

console.log('🌍 测试 Zoho 国际版 SMTP...\n');

// Zoho 国际版正确配置
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',     // 国际版 SMTP 服务器
  port: 587,                 // TLS 端口
  secure: false,             // TLS
  auth: {
    user: 'linghui.meng@bjprog.com',
    pass: 'Yan1219.'  // 你的邮箱密码
  },
  // 调试信息
  debug: true,
  logger: true,
  // 国际版可能需要这些设置
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false  // 仅测试用
  }
});

console.log('📡 连接信息:');
console.log('服务器: smtp.zoho.com:587');
console.log('邮箱: linghui.meng@bjprog.com');
console.log('加密: TLS\n');

transporter.verify()
  .then(() => {
    console.log('✅ SMTP 连接验证成功！');
    console.log('📤 准备发送测试邮件...');
    
    return transporter.sendMail({
      from: '"ULA International" <linghui.meng@bjprog.com>',
      to: 'linghui.meng@bjprog.com',
      subject: '✅ Zoho International SMTP Test - ULA Website',
      text: `Congratulations! Your Zoho International SMTP configuration is working!
      
This is a test email sent from your ULA website.
Time: ${new Date().toLocaleString()}
      
If you receive this, you can now get membership application notifications!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            .success-badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
            .info-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">🎉 Zoho International SMTP Test</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Your email configuration is working!</p>
          </div>
          <div class="content">
            <div class="success-badge">✅ SUCCESS</div>
            <h2>Your Zoho International SMTP is configured correctly!</h2>
            
            <div class="info-box">
              <p><strong>📧 From:</strong> linghui.meng@bjprog.com</p>
              <p><strong>🕐 Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>🌐 Source:</strong> ULA Membership Website</p>
              <p><strong>📍 Server:</strong> smtp.zoho.com (International)</p>
            </div>
            
            <p>Now your website can send membership application notifications automatically!</p>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              This email confirms your Zoho International SMTP settings are working.
            </p>
          </div>
        </body>
        </html>
      `
    });
  })
  .then(info => {
    console.log('\n🎉 Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('✅ Accepted:', info.accepted.join(', '));
    
    console.log('\n📋 Configuration for your .env.local file:');
    console.log(`
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
ZOHO_SMTP_SECURE=false
ZOHO_EMAIL=linghui.meng@bjprog.com
ZOHO_SMTP_PASSWORD=Yan1219.
NOTIFICATION_EMAIL=linghui.meng@bjprog.com
    `);
    
    console.log('\n🚀 Now you can implement this in your Next.js API!');
  })
  .catch(error => {
    console.error('\n❌ Error details:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }
    
    console.log('\n🔍 Troubleshooting for Zoho International:');
    console.log('1. ✅ Login to https://mail.zoho.com');
    console.log('2. ✅ Go to Settings → Mail Accounts');
    console.log('3. ✅ Enable IMAP and POP access');
    console.log('4. ✅ If 2FA is enabled, generate App-Specific Password');
    console.log('5. ✅ Check account status (not suspended)');
    
    // 常见错误处理
    if (error.code === 'EAUTH') {
      console.log('\n🔑 Authentication failed. Try:');
      console.log('• Use correct password (case-sensitive)');
      console.log('• Generate app password if 2FA is on');
      console.log('• Check if account needs "Less secure apps" enabled');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🔌 Connection refused. Try different ports:');
      console.log('• Port 465 with secure: true (SSL)');
      console.log('• Check firewall/antivirus blocking SMTP');
    }
  });