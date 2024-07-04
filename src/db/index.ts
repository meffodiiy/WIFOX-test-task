import mongoose from 'mongoose'


export async function createDatabaseConnection () {
  if (!mongoose.connection?.readyState) {
    try {
      if (!process.env.DATABASE_URI) {
        throw new Error('Env var DATABASE_URI is not setQ')
      }
      await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (error) {
      console.error(`Database connection failed: ${error}`)
      // process.exit(1)
    }
  }

  console.log('Database successfully connected!')
}
