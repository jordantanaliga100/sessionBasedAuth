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

    static async sendResetPasswordEmail(email: string, token: string) {
        // 1. Dito natin ilalagay ang URL ng frontend na may kasamang token
        // Halimbawa: https://yourfrontend.com/reset-password?token=...
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

        // 2. I-setup ang HTML content ng email
        const subject = 'Password Reset Request'
        const html = `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 15 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
        `

        // 3. Tawagin ang iyong email transporter (halimbawa, nodemailer)
        // 3. I-send ang email
        await this.transporter.sendMail({
            from: `"Dev Jordan" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            html,
        })
        // await transporter.sendMail({ from: ..., to: email, subject, html });
        console.log(`Sending reset email to ${email} with token: ${token}`) // Temporary log

        return true
    }
}
