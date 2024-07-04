import { createDatabaseConnection, } from '@db'
// import readline from 'node:readline'

export async function register () {
  try {
    await createDatabaseConnection()
  }
  catch (error) {
    console.error(`Database connection failed: ${error}`)
  }
  //
  // if (process.env.NODE_ENV === 'development') {
  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   })
  //   rl.question('Do you want to seed database? (y/n)', async answer => {
  //     if (answer.toLowerCase().charAt(0) === 'y') {
  //       await (await import('@db/seed')).default()
  //     }
  //     else {
  //       console.log('Database seeding skipped.')
  //     }
  //     rl.close()
  //   })
  // }
}
