import express from 'express'
import AuthGuards from '../../middlewares/AuthGuards'
import GuestGuards from '../../middlewares/GuestGuard'
import { AUTH } from './auth.controller'
const router = express.Router()

// MODE ONE
router.get('/me', AuthGuards, AUTH.me)
router.post('/sign-up', GuestGuards, AUTH.register)
router.post('/sign-in', GuestGuards, AUTH.login)
router.get('/logout', AuthGuards, AUTH.logout)

// Export the router
const AuthRoutes = router
export default AuthRoutes
