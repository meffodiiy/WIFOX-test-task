import { headers, } from 'next/headers'
import { USER_ID_CUSTOM_HEADER, } from '@/middleware'
import StudentModel, { Student, } from '@db/models/student.model'
import TeacherModel, { Teacher, } from '@db/models/teacher.model'


export async function getCurrentUser (): Promise<Student | Teacher> {
  const userId = headers().get(USER_ID_CUSTOM_HEADER)

  let user: Student | Teacher | undefined = <Student> await StudentModel.findById(userId)
  if (!user) user = <Teacher> await TeacherModel.findById(userId)
  if (!user) throw new Error('No user found')

  return user
}
