/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            res.status(201).json({ success: true })
        } catch (error) {
            /* error */
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ success: true })
        } catch (error) {
            /* error */
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ success: true })
        } catch (error) {
            /* error */
        }
    }

    async me(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ success: true })
        } catch (error) {
            /* error */
        }
    }
}

export const AUTH = new AuthController()
