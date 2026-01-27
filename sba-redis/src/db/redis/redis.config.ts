import { RedisStore } from 'connect-redis'
import { createClient } from 'redis'

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    },
})
redisClient.connect().catch(console.error)

redisClient.on('connect', () => {
    console.log('✅ Connected to Redis')
})

redisClient.on('error', (err) => {
    console.log('❌ Redis Client Error', err)
})

export const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
})
