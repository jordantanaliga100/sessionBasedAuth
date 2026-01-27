import cors from 'cors'
import express, { RequestHandler } from 'express'

export const TopMiddlewares: RequestHandler[] = [
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static('./public'),
]
