'use server'

import StudentModel, { Student, } from '@db/models/student.model'
import TeacherModel, { Teacher, } from '@db/models/teacher.model'
import { headers, } from 'next/headers'
import { USER_ID_CUSTOM_HEADER, } from '@/middleware'
import User, { UserDTO, UserType, } from '@db/models/user.model'
import { TaskDTO, } from '@lib/classes/TaskManager/types'
import TaskModel, { Task, } from '@db/models/task.model'


export type DashboardData = {
  user: UserDTO
  tasks: Array<TaskDTO>
}


export async function getDashboardData (): Promise<DashboardData> {
  const userId = headers().get(USER_ID_CUSTOM_HEADER)

  let user: User | undefined = <Student> await StudentModel.findById(userId)
  if (!user) user = <Teacher> await TeacherModel.findById(userId)
  if (!user) throw new Error('No user found')

  const tasks = <Task[]> await (user.type === UserType.STUDENT
    ? TaskModel.find({ assignee: user, })
    : TaskModel.find({ creator: user, }))

  return {
    user: user.getDTO(),
    tasks: tasks.map(t => t.getDTO()),
  }
}
