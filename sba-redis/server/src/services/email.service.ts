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

    static async sendOTP(email: string, otp: string, expiryMinutes: number) {
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
                      <p>This code will expire in <b>${expiryMinutes} minutes</b>.</p>
                </div>
                `,
            })
            console.log(`✅ OTP sent successfully to ${email}`)
        } catch (error) {
            console.error('❌ Email error:', error)
            throw new Error('Failed to send email')
        }
    }

    static async sendVerifiedEmail(email: string) {
        try {
            await this.transporter.sendMail({
                from: `"Dev Jordan" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Account Fully Verified!',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2 style="color: #2ECC71;">Welcome!</h2>
                        <p>Your account has been successfully verified.</p>
                        <p>You can now enjoy all the features of our platform.</p>
                        <p>Thank you for choosing us!</p>
                    </div>
                `,
            })
            console.log(`✅ Verification email sent to ${email}`)
        } catch (error) {
            console.error('❌ Verified Email error:', error)
            // No need to throw error here, hindi dapat maapektuhan ang user flow
            // kung nagka-issue lang sa confirmation email
        }
    }
}
