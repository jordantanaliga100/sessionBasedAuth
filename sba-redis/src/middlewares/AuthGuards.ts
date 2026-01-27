import { NextFunction, Request, Response } from 'express'
import { ErrorClass } from '../class/Error'

export default async function AuthGuards(req: Request, res: Response, next: NextFunction) {
    try {
        const session = req.session?.user
        console.log('AUTH GUARDS', session)

        if (!session) {
            throw new ErrorClass.Unauthorized(` ⚔️ Session expired or not logged in... `)
        }
        req.user = session
        req.session.save()
        next()
    } catch (error) {
        next(error)
    }
}
