import mongoose from 'mongoose'


export async function createDatabaseConnection () {
  if (!mongoose.connection?.readyState) {
    if (!process.env.DATABASE_URI) {
      throw new Error('Env var DATABASE_URI is not setQ')
    }
    await mongoose.connect(process.env.DATABASE_URI)
  }

  console.log('Database successfully connected!')
}
