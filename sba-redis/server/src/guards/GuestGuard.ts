import { NextFunction, Request, Response } from 'express'

export default async function GuestGuards(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user) {
        return res.status(400).json({
            success: false,
            message: 'Naka-login ka na lods, logout muna bago register/login ulit!',
        })
    }

    next()
}
