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
                message: `Forbidden: You need to be ${allowedRoles.join(' or ')} to access this resource.`,
            })
        }
        next()
    }
}
