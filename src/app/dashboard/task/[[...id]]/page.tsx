'use client'

import './styles.sass'
import SearchSelect from '@lib/components/SearchSelect'
import { useEffect, useState, } from 'react'
import { createTask, CreateTaskData, getTaskData, } from '@/app/dashboard/task/[[...id]]/actions'
import { UserDTO, } from '@db/models/user.model'
import { TaskDTO, } from '@lib/classes/TaskManager/types'
import { GradeDTO, } from '@db/models/grade.model'
import Input from '@lib/components/Input'
import Button from '@lib/components/Button'
import * as Texts from '@lib/constants/texts'
import TextArea from '@lib/components/TextArea'
import DatePicker from '@lib/components/DatePicker'
import { handleSubmit, } from '@lib/helpers'


export default function TaskPage ({ params, }: { params: {id: string} }) {
  const [user, setUser,] = useState<UserDTO | undefined>(undefined)
  const [, setTask,] = useState<TaskDTO | undefined>(undefined)
  const [grades, setGrades,] = useState<GradeDTO[] | undefined>(undefined)

  useEffect(() => {
    getTaskData(params.id).then(data => {
      setUser(data.user)
      setTask(data.task)
      setGrades(data.grades)
    })
  }, [params.id,])

  const onSubmit = handleSubmit(async (isValid, data) => {
    if (!isValid) return

    await createTask(data as CreateTaskData)
  })

  const isEditable = user?.isTeacher

  return (
    <form className="task" onSubmit={onSubmit}>
      <section>
        <DatePicker name="dueDate" required/>
        <Button variant="ok" type="submit">
          {Texts.DONE}
        </Button>
      </section>
      <section>
        <Input
          name="title"
          placeholder={Texts.TITLE}
          required
        />
      </section>
      <section>
        <TextArea
          name="description"
          placeholder={Texts.DESCRIPTION}
          minHeight={100}
          required
        />
      </section>
      {isEditable && (
        <section>
          <SearchSelect<GradeDTO>
            key={0}
            name="grade" placeholder={Texts.GRADE}
            required
            options={grades || []}
            render={(grade) => ({
              key: grade.id,
              label: grade.title,
              value: grade.id,
            })}
            minInput={1}
          />
        </section>
      )}
    </form>
  )
}
