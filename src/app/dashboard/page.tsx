'use client'

import './page.sass'
import { useEffect, useRef, useState, } from 'react'
import { getDashboardData, } from '@/app/dashboard/actions'
import TaskManager from '@lib/classes/TaskManager'
import { OnUpdateType, Statistics, TaskDTO, TaskStatusKey, } from '@lib/classes/TaskManager/types'
import { UserDTO, } from '@db/models/user.model'
import { WeekDTO, } from '@lib/classes/WeekTable/types'
import Logo from '@lib/components/Logo'
import * as Texts from '../../lib/constants/texts'
import { TASK_STATUS_NAMES, } from '../../lib/constants/texts'
import { useRouter, } from 'next/navigation'


const WEEK_DAY_NAMES = [
  '',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П\'ятниця',
  'Субота',
]

const getWeekNameFromWeekId = (weekId: WeekDTO['id']) => {
  const full = `Тиждень ${weekId.replace('week', '')}`
  const short = full.at(0) + full.split(' ')[1]
  return {
    full,
    short,
  }
}


export default function DashboardPage () {
  const router = useRouter()
  const taskManagerRef = useRef<TaskManager | undefined>(undefined)
  const [user, setUser,] = useState<UserDTO | undefined>(undefined)
  const [, setTasks,] = useState<Array<TaskDTO>>([])
  const [weeks, setWeeks,] = useState<Array<WeekDTO> | undefined>(undefined)
  const [statistics, setStatistics,] = useState<Statistics | undefined>(undefined)

  useEffect(() => {
    void async function () {
      const dashboardData = await getDashboardData()

      setUser(dashboardData.user)

      const taskManager = new TaskManager(dashboardData.tasks)
      taskManager.onUpdate(OnUpdateType.TASKS, setTasks)
      taskManager.onUpdate(OnUpdateType.WEEKS, setWeeks)
      taskManager.onUpdate(OnUpdateType.STATS, setStatistics)
      taskManager.triggerAllCallbacks()

      taskManagerRef.current = taskManager
    }()
  }, [])

  const gotoToNewTaskPage = () => router.push('/dashboard/task')

  return (
    <div className="week-table">
      <div className="week-table__head">
        <div className="week-table__head-top">
          <Logo variant="small"/>
          <div className="week-table__stats">
            {statistics && Object.entries(statistics.taskStatus).map(([key, value,], index) => (
              <div className={`week-table__stats-item week-table__stats-item--${key}`} key={index}>
                <span>{TASK_STATUS_NAMES[key as TaskStatusKey]} |&nbsp;</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          {/*<span>{Texts.LOG_OUT}</span>*/}
          <div className="week-table__profile-circle">
            {user?.name.charAt(0) || ''}
          </div>
        </div>
        <div className="week-table__days">
          <div className="week-table__row week-table__row--no-height">
            {new Array(6).fill(0).map((_, index) => (
              <div className="week-table__row-section" key={index}>
                <span className="week-table__day">
                  {WEEK_DAY_NAMES[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="week-table__body">
        {weeks?.map(week => {
          const tasksOnWeek = taskManagerRef.current?.getTasksByWeekId(week.id) || ([] as TaskDTO[])
          const weekName = getWeekNameFromWeekId(week.id)
          return (
            <div className="week-table__row" key={week.id}>
              <div className="week-table__row-head">
                <span className="week-table__row-head-item--full">
                  {weekName.full}
                </span>
                <span className="week-table__row-head-item--short">
                  {weekName.short}
                </span>
                {statistics && (
                  <span className="week-table__row-head-item--sub">
                    {statistics.dueDateStats[week.id] || 0} завдань
                  </span>
                )}
              </div>
              {new Array(7).fill(0).map((_, index) => {
                const tasksOnDay = tasksOnWeek.filter(t => t.dayIndex === index)
                return [0, 6,].includes(index) ? undefined : (
                  <div
                    className="week-table__row-section"
                    key={`${week.id}_s${index}`}
                    onClick={gotoToNewTaskPage}
                  >
                    {tasksOnDay.map(task => (
                      <span
                        className={`week-table__task week-table__task--${task.status}`}
                        key={task.id}
                      >
                        {task.title}
                      </span>
                    ))}
                    {user?.isTeacher && (
                      <button
                        className="week-table__add-task-btn"
                        onClick={gotoToNewTaskPage}
                      >
                        {Texts.ADD_TASK}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
