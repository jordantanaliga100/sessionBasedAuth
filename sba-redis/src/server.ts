import dotenv from 'dotenv'
import app from './app'
import { connectDataSource } from './config/data-source'
import { initAuth } from './utils/initAuth'

// ENV CONFIG
const nodeEnv = process.env.NODE_ENV || 'development'
const envFile = nodeEnv === 'production' ? '.env.prod' : '.env.local'
dotenv.config({ path: envFile })
console.log(`✅ Loaded envFile`)
console.log('... on ' + nodeEnv + ' environment 🚀')

// SERVER INSTANCE
const port = process.env.PORT || 5000
const start = async () => {
    try {
        // DB connection here... 🩸🩸🩸
        // await connectMysql();
        // await connectPostgres();
        // await connectMongo();

        await connectDataSource()
        initAuth(process.env.AUTH_MODE as string, app)

        app.listen(port, () => {
            console.log('Server started at ' + port + ' and connected to DB !!')
        })
    } catch (error) {
        console.log(error)
    }
}
start()
