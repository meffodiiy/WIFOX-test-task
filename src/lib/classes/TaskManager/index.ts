import { Statistics, Task, } from './types'
import { toCamelCase, } from '@lib/helpers'
import WeekTable from '../WeekTable'


export default class TaskManager {

  private readonly tasks: Array<Task>
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

  constructor (tasks: Array<Task> = []) {
    this.tasks = tasks.sort((a, b) => a.dueDate < b.dueDate ? -1 : 1)

    this.weekTable = this.tasks.length > 0
      ? new WeekTable(this.tasks.at(0)!.dueDate, this.tasks.at(-1)!.dueDate)
      : new WeekTable

    this.createStatistics()
  }

  private createStatistics () {
    for (const task of this.tasks) {
      this.updateStatistics(task)
    }
  }

  private updateStatistics (task: Task) {
    const taskStatus = toCamelCase(task.status)
    const assigneeName = task.assignee
    const week = this.weekTable.getWeekByDate(task.dueDate)

    this.statistics.taskStatus[taskStatus]++
    this.statistics.assigneeStats[assigneeName] = (this.statistics.assigneeStats[assigneeName] || 0) + 1
    this.statistics.dueDateStats[week] = (this.statistics.dueDateStats[week] || 0) + 1
  }

  public showStatistics () {
    console.log(this.statistics)
  }

  public addTask (task: Task) {
    this.tasks.push(task)
    this.weekTable.attemptToUpdate(task.dueDate)
    this.updateStatistics(task)
  }

}
