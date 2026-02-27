/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorClass } from '../../class/Error'
import { pool } from '../../db/postgres/postgres'
import { redisClient } from '../../db/redis/redis.config'
import { EmailService } from '../../services/email.service'
import { User } from '../../types/user'
import { comparePassword, hashPassword } from '../../utils/encrypt'

class Auth {
    public async register(data: User) {
        const { username, email, password, role } = data

        const hashedPassword = await hashPassword(password)

        const values = [username, email, hashedPassword, role || 'user']

        const sql = `
        INSERT INTO users (username, email, password, role)
        -- Dapat apat din ang placeholders ($1, $2, $3, $4)
        VALUES ($1, $2, $3, $4) 
        RETURNING id, username, email, role, created_at;
    `
        try {
            const { rows } = await pool.query(sql, values)
            const newUser = rows[0]

            // --- OTP LOGIC START ---
            // 1. Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString()

            // 2. Save sa Redis (Key: otp:email, Expire: 5 mins)
            await redisClient.set(`otp:${email}`, otp, { EX: 1800 })

            // 3. Send Email via Gmail (async, don't forget to await)
            await EmailService.sendOTP(email, otp)
            // --- OTP LOGIC END ---

            return newUser
        } catch (error: any) {
            if (error.code === '23505') {
                throw new Error('Username or Email already exists')
            }
            throw error
        }
    }
    public async login(data: { email: string; password: string }) {
        const { email, password } = data

        const sql = `SELECT id, username, email, password, role, is_verified FROM users WHERE email = $1`

        try {
            const { rows } = await pool.query(sql, [email])

            // 1. Check kung may nahanap na user
            if (rows.length === 0) {
                throw new ErrorClass.NotFound('User does not exist')
            }

            const user = rows[0]

            console.log('newly created user', user)

            // CHECK: Kung hindi pa verified, huwag hayaang mag-login
            if (!user.is_verified) {
                throw new ErrorClass.BadRequest('Please verify your email first before logging in.')
            }

            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
                throw new ErrorClass.BadRequest('Invalid email or password')
            }

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        } catch (error: any) {
            throw new Error(error.message || 'Login failed')
        }
    }
    public async forgotPassword() {
        return null
    }
}
export const AuthService = new Auth()
