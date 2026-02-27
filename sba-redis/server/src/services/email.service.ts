import nodemailer from 'nodemailer'

export class EmailService {
    private static transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        // port: 587,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    static async sendOTP(email: string, otp: string) {
        try {
            await this.transporter.sendMail({
                from: `"Dev Jordan" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Account Verification Code',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2>Verification Code</h2>
                        <p>Your 6-digit OTP is:</p>
                        <h1 style="color: #4A90E2;">${otp}</h1>
                        <p>This code will expire in 5 minutes.</p>
                    </div>
                `,
            })
            console.log(`✅ OTP sent successfully to ${email}`)
        } catch (error) {
            console.error('❌ Email error:', error)
            throw new Error('Failed to send email')
        }
    }
}
