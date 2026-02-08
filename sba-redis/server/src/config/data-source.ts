export const connectDataSource = async () => {
    try {
        console.log('✅ ALL Data Source has been initialized!')
    } catch (error) {
        if (error instanceof Error) {
            console.error('❌ PostgreSQL Connection Error:', error?.message)
        } else {
            console.error('❌ PostgreSQL Connection Error:', error)
            throw error
        }
        process.exit(1)
    }
}
