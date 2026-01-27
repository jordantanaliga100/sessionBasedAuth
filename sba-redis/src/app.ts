// IMPORTS
import express, { Request, Response } from 'express'
import { BottomMiddlewares } from './middlewares/Bottom'
import { TopMiddlewares } from './middlewares/Top'

const app = express()

// TOP MIDDLEWARES
TopMiddlewares.forEach((mw) => app.use(mw))

// ROUTES
app.get('/', (req: Request, res: Response) => {
    // throw new Error("Testing gin index");
    res.send('Node_Express Server Alive 🛩️')
})

app.use('/api/v1/auth', () => {})
app.use('/api/v1/products', () => {})
app.use('/api/v1/services', () => {})
app.use('/api/v1/contact', () => {})
app.use('/api/v1/users', () => {})

// BOTTOM MIDDLEWARES
BottomMiddlewares.forEach((mw) => app.use(mw))
export default app
