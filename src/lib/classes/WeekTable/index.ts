import { WeekDTO, } from './types'


const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000
const MILLISECONDS_IN_A_WEEK = 7 * MILLISECONDS_IN_A_DAY
const MIN_WEEKS_COUNT = 20


export default class WeekTable {

  public static readonly UNKNOWN_WEEK_ID = 'unknown week'

  public weeks: Array<WeekDTO> = []

  constructor (private startDate: Date = new Date, private endDate: Date = new Date) {
    this.generateWeeks(startDate, endDate)
  }

  private generateWeeks (from: Date, to: Date) {
    const firstWeekStart = Math.floor(from.getTime() / MILLISECONDS_IN_A_DAY) * MILLISECONDS_IN_A_DAY - (from.getDay() * MILLISECONDS_IN_A_DAY)
    const lastWeekEnd = Math.floor(to.getTime() / MILLISECONDS_IN_A_DAY) * MILLISECONDS_IN_A_DAY + ((6 - to.getDay()) * MILLISECONDS_IN_A_DAY)
    let weeksCount = Math.floor((lastWeekEnd - firstWeekStart) / MILLISECONDS_IN_A_WEEK + 1)

    weeksCount = weeksCount > MIN_WEEKS_COUNT ? weeksCount : MIN_WEEKS_COUNT

    this.weeks = new Array(weeksCount).fill(0).map((_, index) => ({
      id: `week${index + 1}`,
      starts: new Date(firstWeekStart + index * MILLISECONDS_IN_A_WEEK),
      ends: new Date(firstWeekStart + index * MILLISECONDS_IN_A_WEEK + MILLISECONDS_IN_A_WEEK),
    }))
  }

  public getWeekIdByDate (date: Date): WeekDTO['id'] {
    const week = this.weeks.find(({ starts, ends, }) => starts <= date && ends >= date)
    return week?.id || WeekTable.UNKNOWN_WEEK_ID
  }

  public attemptToUpdate (date: Date): boolean {
    let updated = false

    if (date < this.startDate) {
      this.generateWeeks(date, this.endDate)
      updated = true
    }
    else if (date > this.endDate) {
      this.generateWeeks(this.startDate, date)
      updated = true
    }

    return updated
  }
}
