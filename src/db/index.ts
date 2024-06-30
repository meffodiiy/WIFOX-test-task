import mongoose, { InferSchemaType, Model, Schema, } from 'mongoose'


export async function createDatabaseConnection () {
  if (!mongoose.connection.readyState) {
    try {
      await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (error) {
      console.error(`Database connection failed: ${error}`)
      process.exit(1)
    }
  }

  console.log('Database successfully connected!')
}

export function buildModel <T extends Schema, > (name: string, schema: T) {
  return <Model<InferSchemaType<T>>> mongoose.models[name] || mongoose.model(name, schema)
}
