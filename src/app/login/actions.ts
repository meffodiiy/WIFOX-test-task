'use server'

import SchoolModel, { School, } from '@db/models/school.model'
import GradeModel, { Grade, } from '@db/models/grade.model'
import SubjectModel, { Subject, } from '@db/models/subject.model'
import User, { UserType, } from '@db/models/user.model'
import { Document, } from 'mongoose'
import StudentModel, { Student, } from '@db/models/student.model'
import TeacherModel, { Teacher, } from '@db/models/teacher.model'
import { authorizeAndRedirect, } from '@lib/auth'


export type SignUpFormData = {
  schools: School[]
  grades: Grade[]
  subjects: Subject[]
}

export async function getSignUpFormData (): Promise<SignUpFormData> {
  return {
    schools: <School[]> await SchoolModel.find().sort({ title: 'asc', }),
    grades: <Grade[]> await GradeModel.find().sort({ title: 'asc', }),
    subjects: <Subject[]> await SubjectModel.find().sort({ title: 'asc', }),
  }
}

export type BaseSignUpData = Record<'name' | 'school' | 'password', string>
export type StudentSignUpData = BaseSignUpData & { type: UserType.STUDENT, grade: string }
export type TeacherSignUpData = BaseSignUpData & { type: UserType.TEACHER, subject: string }
export type SignUpData = StudentSignUpData | TeacherSignUpData

export async function signUp (data: SignUpData): Promise<false | undefined> {
  const base = {
    name: data.name,
    school: data.school,
    password: data.password,
  }

  let succeed = true
  let newUser: Document<unknown, {}, User> & User | undefined = undefined

  try {
    if (data.type === UserType.STUDENT) {
      newUser = await StudentModel.create({
        ...base,
        type: UserType.STUDENT,
        grade: data.grade,
      })
    }
    else {
      newUser = await TeacherModel.create({
        ...base,
        type: UserType.TEACHER,
        subject: data.subject,
      })
    }

    await newUser.save()
  }
  catch (error) {
    succeed = false
    console.error('ERROR in signUp', error)
  }

  if (!succeed || !newUser) return false

  await authorizeAndRedirect(newUser, '/dashboard')
}

export type LogInData = Record<'name' | 'password', string>

export async function logIn (data: LogInData): Promise<false | undefined> {
  let user: User | undefined = <Student> await StudentModel.findOne({ name: data.name, })

  if (!user) user = <Teacher> await TeacherModel.findOne({ name: data.name, })

  if (!user) return false

  const isPasswordCorrect = await user.comparePassword(data.password)

  if (!isPasswordCorrect) return false

  await authorizeAndRedirect(user, '/dashboard')
}
