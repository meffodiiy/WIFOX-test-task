'use server'

import { UserDTO, UserType, } from '@db/models/user.model'
import { TaskDTO, } from '@lib/classes/TaskManager/types'
import TaskModel, { Task, } from '@db/models/task.model'
import { getCurrentUser, } from '@/app/actions'
import GradeModel, { Grade, GradeDTO, } from '@db/models/grade.model'
import { Teacher, } from '@db/models/teacher.model'
import StudentModel, { Student, } from '@db/models/student.model'
import { redirect, } from 'next/navigation'


type TaskData = {
  user: UserDTO
  task?: TaskDTO
  grades?: Array<GradeDTO>
}

export async function getTaskData (taskId?: TaskDTO['id']): Promise<TaskData> {
  const user = await getCurrentUser()
  const task = <Task | undefined> (taskId && await TaskModel.findById(taskId))

  const grades = user.type === UserType.TEACHER
    ? (<Grade[]> await GradeModel.find().sort({ title: 'asc', })).map(g => g.getDTO())
    : undefined

  return {
    user: user.getDTO(),
    task: task?.getDTO(),
    grades,
  }
}

export type CreateTaskData = Pick<TaskDTO, 'title' | 'description' | 'dueDate'> & {
  grade: string
}

export async function createTask (data: CreateTaskData) {
  const user = <Teacher> await getCurrentUser()

  const students = <Student[]> await StudentModel.find({ grade: data.grade, })

  console.log('A', students)
  await TaskModel.create(students.map(s => ({
    title: data.title,
    description: data.description,
    assignee: s._id,
    creator: user._id,
    status: 'open',
    dueDate: data.dueDate,
  })))

  console.log('B')

  redirect('/dashboard')
}
