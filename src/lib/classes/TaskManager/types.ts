import { ToCamelCase, } from '@lib/types'
import { WeekDTO, } from '@lib/classes/WeekTable/types'


export type TaskStatus = 'open' | 'in progress' | 'completed'
export type TaskStatusKey = ToCamelCase<TaskStatus>

export type TaskDTO = Record<'id' | 'title' | 'description' | 'assignee', string> & {
  status: TaskStatusKey
  dueDate: Date
  weekId: string
  dayIndex: number
}

export type Statistics = {
  taskStatus: Record<TaskStatusKey, number>
  assigneeStats: Record<string, number>
  dueDateStats: Record<string, number>
}

export enum OnUpdateType {
  TASKS = 'tasks',
  WEEKS = 'weeks',
  STATS = 'stats',
}

export type UpdateCallbacks = {
  [OnUpdateType.TASKS]: (tasks: Array<TaskDTO>) => void
  [OnUpdateType.WEEKS]: (tasks: Array<WeekDTO>) => void
  [OnUpdateType.STATS]: (tasks: Statistics) => void
}
