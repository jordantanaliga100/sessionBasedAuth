/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from '../../db/postgres/postgres'

class Auth {
    public async register(data: { username: string; email: string; password: string }) {
        const { username, email, password } = data
        const values = [username, email, password]

        const sql = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at;
        `
        try {
            const { rows } = await pool.query(sql, values)
            return rows[0] // Ibabalik ang user info (minus the password logic later)
        } catch (error: any) {
            if (error.code === '23505') {
                // Unique violation error code
                throw new Error('Username or Email already exists')
            }
            throw error
        }
    }
    public async login(data: { email: string; password: string }) {
        const { email, password } = data

        const sql = `
        SELECT id, username, email, password 
        FROM users 
        WHERE email = $1;
    `

        try {
            const { rows } = await pool.query(sql, [email])

            // 1. Check kung may nahanap na user
            if (rows.length === 0) {
                throw new Error('Invalid email or password')
            }

            const user = rows[0]

            // 2. I-compare ang password
            if (user.password !== password) {
                throw new Error('Invalid email or password')
            }

            return {
                id: user.id,
                username: user.username,
                email: user.email,
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
