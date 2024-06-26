import {Week} from "./types";


const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000
const MILLISECONDS_IN_A_WEEK = 7 * MILLISECONDS_IN_A_DAY


export default class WeekTable {

  private weeks: Array<Week> = []

  constructor (private startDate: Date, private endDate: Date) {
    this.generateWeeks(startDate, endDate)
  }

  private generateWeeks (from: Date, to: Date) {
    const firstWeekStart = Math.floor(from.getTime() / MILLISECONDS_IN_A_DAY) * MILLISECONDS_IN_A_DAY - (from.getDay() * MILLISECONDS_IN_A_DAY)
    const lastWeekEnd = Math.floor(to.getTime() / MILLISECONDS_IN_A_DAY) * MILLISECONDS_IN_A_DAY + ((6 - to.getDay()) * MILLISECONDS_IN_A_DAY)
    const weeksCount = (lastWeekEnd - firstWeekStart) / MILLISECONDS_IN_A_DAY

    this.weeks = new Array(weeksCount).fill(0).map((_, index) => ({
      starts: new Date(firstWeekStart + index * MILLISECONDS_IN_A_WEEK),
      ends: new Date(firstWeekStart + index * MILLISECONDS_IN_A_WEEK + MILLISECONDS_IN_A_WEEK)
    }))
  }

  public getWeekByDate (date: Date): string {
    const weekIndex = this.weeks.findIndex(({ starts, ends }) => starts <= date && ends >= date)

    if (weekIndex === -1) {
      return 'unknown week'
    }

    return `week${weekIndex + 1}`
  }

  public attemptToUpdate (date: Date) {
    if (date < this.startDate) {
      this.generateWeeks(date, this.endDate)
    }
    else if (date > this.endDate) {
      this.generateWeeks(this.startDate, date)
    }
  }
}
