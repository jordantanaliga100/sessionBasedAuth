import express from 'express'
import AuthGuards from '../../middlewares/AuthGuards'
import { RoleGuards } from '../../middlewares/RoleGuards'
import { USERS } from './user.controller'

const router = express.Router()

// Eto lang muna, para sa profile view later on
router.get('/', AuthGuards, RoleGuards('admin', 'moderator'), USERS.getAllUsers)

const UsersRoutes = router
export default UsersRoutes
