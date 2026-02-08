/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from '../../db/postgres/postgres'
import { User } from '../../types/user'

class Auth {
    public async register(data: User) {
        const { username, email, password, role } = data

        const values = [username, email, password, role || 'user']

        const sql = `
        INSERT INTO users (username, email, password, role)
        -- Dapat apat din ang placeholders ($1, $2, $3, $4)
        VALUES ($1, $2, $3, $4) 
        RETURNING id, username, email, role, created_at;
    `
        try {
            const { rows } = await pool.query(sql, values)
            return rows[0]
        } catch (error: any) {
            if (error.code === '23505') {
                throw new Error('Username or Email already exists')
            }
            throw error
        }
    }
    public async login(data: { email: string; password: string }) {
        const { email, password } = data

        const sql = `SELECT id, username, email, password, role FROM users WHERE email = $1`

        try {
            const { rows } = await pool.query(sql, [email])

            console.log('rows', rows)

            // 1. Check kung may nahanap na user
            if (rows.length === 0) {
                throw new Error('Invalid email or password')
            }

            const user = rows[0]
            console.log('Input:', `|${password}|`)
            console.log('DB:', `|${user.password}|`)
            // 2. I-compare ang password
            if (user.password.trim() !== password.trim()) {
                throw new Error('Invalid email or password')
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
