import { NextFunction, Request, Response } from 'express'

export default async function AuthGuards(req: Request, res: Response, next: NextFunction) {
    try {
        next()
    } catch (error) {
        next(error)
    }
}
