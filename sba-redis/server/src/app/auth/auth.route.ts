import express from 'express'
const router = express.Router()

// MODE ONE
router.get('/me', () => {})
router.post('/sign-up', () => {})
router.post('/sign-in', () => {})
router.get('/logout', () => {})

// Export the router
const AuthRoutes = router
export default AuthRoutes
