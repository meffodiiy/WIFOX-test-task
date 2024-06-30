import { ToCamelCase, } from '@lib/types'


export type TaskStatus = 'open' | 'in progress' | 'completed'

export type Task = Record<'title' | 'description' | 'assignee', string> & {
  status: TaskStatus
  dueDate: Date
}

export type TaskStatusKey = ToCamelCase<TaskStatus>

export type Statistics = {
  taskStatus: Record<TaskStatusKey, number>
  assigneeStats: Record<string, number>
  dueDateStats: Record<string, number>
}
