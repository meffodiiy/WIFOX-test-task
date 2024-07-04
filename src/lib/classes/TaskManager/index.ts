import { OnUpdateType, Statistics, TaskDTO, UpdateCallbacks, } from './types'
import WeekTable from '../WeekTable'
import { WeekDTO, } from '@lib/classes/WeekTable/types'


export default class TaskManager {

  private readonly tasks: Array<TaskDTO>
  private readonly weekTable: WeekTable
  private readonly statistics: Statistics = {
    taskStatus: {
      open: 0,
      inProgress: 0,
      completed: 0,
    },
    assigneeStats: {},
    dueDateStats: {},
  }
  private readonly weekIdToTasksMap = {} as Record<WeekDTO['id'], Array<TaskDTO> | undefined>
  private readonly updateCallbacks = {} as UpdateCallbacks

  constructor (tasks: Array<TaskDTO> = []) {
    this.tasks = tasks.sort((a, b) => a.dueDate < b.dueDate ? -1 : 1)
    this.updateCallbacks.tasks?.(this.tasks)

    this.weekTable = this.tasks.length > 0
      ? new WeekTable(this.tasks.at(0)!.dueDate, this.tasks.at(-1)!.dueDate)
      : new WeekTable
    this.updateCallbacks.weeks?.(this.weekTable.weeks)
    console.log(this.weekTable.weeks, this.updateCallbacks.weeks)

    this.createStatistics()
  }

  private createStatistics () {
    for (const task of this.tasks) {
      this.updateStatistics(task)
    }
    this.updateCallbacks.stats?.(this.statistics)
  }

  private updateStatistics (task: TaskDTO) {
    const taskStatus = task.status
    const assigneeName = task.assignee
    const week = this.weekTable.getWeekIdByDate(task.dueDate)
    task.weekId = week

    let tasksOnWeek = this.weekIdToTasksMap[week]
    if (!tasksOnWeek) {
      this.weekIdToTasksMap[week] = tasksOnWeek = []
    }
    tasksOnWeek.push(task)

    this.statistics.taskStatus[taskStatus]++
    this.statistics.assigneeStats[assigneeName] = (this.statistics.assigneeStats[assigneeName] || 0) + 1
    this.statistics.dueDateStats[week] = (this.statistics.dueDateStats[week] || 0) + 1
  }

  public showStatistics () {
    console.log(this.statistics)
  }

  public addTask (task: TaskDTO) {
    this.tasks.push(task)
    this.updateCallbacks.tasks?.(this.tasks)

    const updated = this.weekTable.attemptToUpdate(task.dueDate)
    if (updated) {
      this.updateCallbacks.weeks?.(this.weekTable.weeks)
    }

    this.updateStatistics(task)
    this.updateCallbacks.stats?.(this.statistics)
  }

  public getTasksByWeekId (weekId: WeekDTO['id']): Array<TaskDTO> {
    return this.weekIdToTasksMap[weekId] || []
  }

  public onUpdate <T extends OnUpdateType, > (type: T, callback: UpdateCallbacks[T]) {
    this.updateCallbacks[type] = callback
  }

  public triggerAllCallbacks () {
    this.updateCallbacks.tasks?.(this.tasks)
    this.updateCallbacks.weeks?.(this.weekTable.weeks)
    this.updateCallbacks.stats?.(this.statistics)
  }
}
