import { RedisStore } from 'connect-redis'
import session from 'express-session'
import { createClient } from 'redis'

// 1. Initialize Redis Client agad
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`,
})

// Connect at handle error
redisClient.connect().catch(console.error)

// 2. I-setup ang Store
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
})

// 3. I-export ang session middleware
export const sessionConfig = session({
    store: redisStore, // Force Redis Store
    secret: process.env.SESSION_SECRET || 'pogi-secret-key',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 30, // 30 minutes
    },
})
