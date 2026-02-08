import express from 'express'
import AuthGuards from '../../middlewares/AuthGuards'
import { USERS } from './user.controller'

const router = express.Router()

// Eto lang muna, para sa profile view later on
router.get('/', AuthGuards, USERS.getAllUsers)

const UsersRoutes = router
export default UsersRoutes
