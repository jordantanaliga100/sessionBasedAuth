import { Express } from 'express'
import { redisStore } from '../db/redis/redis.config'
import { setSession } from './setSessionInCookie'

/**
 * Initializes the authentication system dynamically.
 */
export const initAuth = (mode: string, app: Express) => {
    switch (mode) {
        case 'session':
            console.log('🧠 Using session-based auth (in-memory store)')
            app.use(setSession()) // no store passed
            break

        case 'session_store':
            console.log('🧠 Using session-based auth (redis store)')
            app.use(setSession(redisStore)) // Redis store
            break

        case 'token':
        default:
            console.log('🔐 Using token-based auth (stateless)')
            // No middleware needed
            break
    }
}
