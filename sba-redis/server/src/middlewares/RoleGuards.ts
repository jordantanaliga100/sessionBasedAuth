import { NextFunction, Request, Response } from 'express'
export const RoleGuards = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.session?.user

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Please Login !' })
        }
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as string)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Kailangan mo ng role na ${allowedRoles.join(' or ')}`,
            })
        }
        next()
    }
}
