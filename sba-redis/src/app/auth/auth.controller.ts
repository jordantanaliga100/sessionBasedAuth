// Register a new user

import { Request, Response } from 'express'
import { ErrorClass } from '../../class/Error'
import { SafeUserDTO } from '../../dto/user.dto'
import { ApiResponse, ErrorResponse } from '../../types/response-types'
import { LoginDTO, RegisterDTO } from './auth.dto'

export const CURRENT_USER = async (
    req: Request,
    res: Response<ApiResponse<SafeUserDTO> | ErrorResponse>
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'No user logged in',
            })

            return
        }

        res.status(200).json({
            success: true,
            message: 'Current user retrieved successfully',
        } as ApiResponse<SafeUserDTO>)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unknown error',
            })
        }
    }
}
export const REGISTER_USER = async (
    req: Request<Record<string, never>, Record<string, never>, RegisterDTO, Record<string, never>>,
    res: Response<ApiResponse<SafeUserDTO> | ErrorResponse>
): Promise<void> => {
    try {
        const {
            body: { username, email, password },
        } = req
        console.log('REQUEST BODY', req.body)

        if (!email || !password || !username) {
            throw new ErrorClass.BadRequest('All fields are required ! 💁')
        }

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, message: error.message })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unknown error',
            })
        }
    }
}
// User Login
export const LOGIN_USER = async (
    req: Request<Record<string, never>, Record<string, never>, LoginDTO>,
    res: Response<ApiResponse<SafeUserDTO> | ErrorResponse>
): Promise<void> => {
    try {
        const { email, password } = req.body

        console.log('REQUEST BODY', req.body)
        // const userAgent = req.headers["user-agent"] || "unknown";
        // const userIP =
        // req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.ip;

        if (!email || !password) {
            throw new ErrorClass.BadRequest('Must have email and password')
        }

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
        } as ApiResponse<SafeUserDTO>)
    } catch (error: unknown) {
        if (error instanceof Error) {
            const err = error as Express.CustomError
            res.status(err.statusCode || 400).json({
                success: false,
                message: err.message,
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unknown error',
            })
        }
    }
}

// User Logout
export const LOGOUT_USER = async (
    req: Request,
    res: Response<ApiResponse<null> | ErrorResponse>
): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
            data: null,
        })
    } catch (error) {
        console.error('🚨 Logout controller error:', error)

        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unexpected logout error',
        })
    }
}

// Forgot Password
export const FORGOT_PASSWORD = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ success: true })
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, message: error.message })
        } else {
            console.error('❌ PostgreSQL Connection Error:', error)
            throw error
        }
    }
}
