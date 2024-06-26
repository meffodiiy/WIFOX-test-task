import {Statistics, Task, TaskStatusKey} from "./types";
import {toCamelCase} from "./helpers";
import WeekTable from "./WeekTable";

export default class TaskManager {

  private readonly tasks: Array<Task>
  private weekTable: WeekTable | undefined = undefined
  private readonly statistics: Statistics = {
    taskStatus: {
      open: 0,
      inProgress: 0,
      completed: 0
    },
    assigneeStats: {},
    dueDateStats: {}
  }

  constructor (tasks: Array<Task> = []) {
    this.tasks = tasks.sort((a, b) => a.dueDate < b.dueDate ? -1 : 1)

    if (this.tasks.length > 0) {
      this.weekTable = new WeekTable(
        this.tasks.at(0)!.dueDate,
        this.tasks.at(-1)!.dueDate
      )
    }

    this.createStatistics()
  }

  private createStatistics () {
    for (const task of this.tasks) {
      this.updateStatistics(...this.getTaskStats(task))
    }
  }

  private updateStatistics (taskStatus: TaskStatusKey, assigneeName: string, week: string) {
    this.statistics.taskStatus[taskStatus]++
    this.statistics.assigneeStats[assigneeName] = (this.statistics.assigneeStats[assigneeName] || 0) + 1
    this.statistics.dueDateStats[week] = (this.statistics.dueDateStats[week] || 0) + 1
  }

  private getTaskStats (task: Task): [TaskStatusKey, string, string] {
    return [toCamelCase(task.status) as TaskStatusKey, task.assignee, this.weekTable?.getWeekByDate(task.dueDate) || '']
  }

  public showStatistics () {
    console.log(this.statistics)
  }

  public addTask (task: Task) {
    this.tasks.push(task)

    if (!this.weekTable && this.tasks.length === 1) {
      this.weekTable = new WeekTable(
        task.dueDate,
        task.dueDate,
      )
    }
    else {
      this.weekTable?.attemptToUpdate(task.dueDate)
    }

    this.updateStatistics(...this.getTaskStats(task))
  }

}
