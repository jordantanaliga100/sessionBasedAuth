import { connectMongo } from '../db/mongodb/mongodb'
import { connectMysql } from '../db/mysql/mysql'
import { connectPostgres } from '../db/postgres/postgres'

export const connectDataSource = async () => {
    try {
        // await PostgresDataSource.initialize(); //🔥
        // await MysqlDataSource.initialize(); //🔥
        // await MongoDataSource.initialize(); //🔥

        await connectPostgres()
        await connectMysql()
        await connectMongo()

        console.log('✅ ALL Data Source has been initialized!')
    } catch (error) {
        if (error instanceof Error) {
            console.error('❌ PostgreSQL Connection Error:', error?.message)
        } else {
            console.error('❌ PostgreSQL Connection Error:', error)
            throw error
        }
    }
}
