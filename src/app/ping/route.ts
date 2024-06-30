import User from '@db/models/student.model'

export async function GET (request: Request) {

  const user = await User.create({
    name: true,
  })

  return new Response(JSON.stringify(user))
}
