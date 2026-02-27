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
               <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px;">
               <div style="background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; border: 1px solid #ffeeba; text-align: center; font-size: 14px; margin-bottom: 15px; font-weight: bold;">
        ⚠️ This is for testing purposes, lab. Don't worry! 😇
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <h2 style="color: #333333; margin-top: 0; font-size: 24px;">Verification Code</h2>
        
        <p style="color: #555555; font-size: 16px; line-height: 1.5;">
            Hello! Please use the following code to verify your email address.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; font-size: 36px; font-weight: bold; color: #4A90E2; letter-spacing: 5px; padding: 15px 30px; background-color: #eaf2fa; border-radius: 4px;">
                ${otp}
            </div>
        </div>
        
        <p style="color: #555555; font-size: 14px; line-height: 1.5; background-color: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; border-radius: 4px;">
            <strong>Note:</strong> This code will expire in <strong>${expiryMinutes} minutes</strong>. If you did not request this, please ignore this email.
        </p>
        
        <p style="color: #999999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 10px;">
            &copy; 2026 YourApp. All rights reserved.
        </p>
    </div>
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
                  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f4f7f6; border-radius: 8px;">
                  <div style="background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; border: 1px solid #ffeeba; text-align: center; font-size: 14px; margin-bottom: 15px; font-weight: bold;">
        ⚠️ This is for testing purposes, lab. Don't worry! 😇
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
        
        <div style="margin-bottom: 20px;">
            <span style="font-size: 50px;">✅</span> </div>
        
        <h2 style="color: #2ECC71; margin-top: 0; font-size: 28px; font-weight: bold;">Verified Successfully!</h2>
        
        <p style="color: #555555; font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
            Hi there! Your account has been successfully verified. 
            <br>
            You can now enjoy all the features of our platform.
        </p>
        
        <a href="https://your-app-link.com/login" style="display: inline-block; padding: 15px 30px; background-color: #2ECC71; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Go to Dashboard
        </a>
        
        <p style="color: #999999; font-size: 12px; margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 20px;">
            Thank you for choosing us! <br>
            &copy; 2026 YourApp. All rights reserved.
        </p>
    </div>
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
