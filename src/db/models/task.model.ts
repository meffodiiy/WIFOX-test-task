import { getModelForClass, prop, Ref, } from '@typegoose/typegoose'
import Entity from '@db/models/entity.model'
import { Model, models, } from 'mongoose'
import { Student, } from '@db/models/student.model'
import { TaskDTO, TaskStatus, } from '@lib/classes/TaskManager/types'
import { ToDTO, } from '@db/types'
import { Teacher, } from '@db/models/teacher.model'
import { toCamelCase, } from '@lib/helpers'


export class Task extends Entity implements ToDTO<TaskDTO> {

  @prop({
    type: String,
    required: true,
  })
  public description!: string

  @prop({
    ref: () => Student,
    required: true,
  })
  public assignee!: Ref<Student>

  @prop({
    ref: () => Teacher,
    required: true,
  })
  public creator!: Ref<Teacher>

  @prop({
    type: String,
    default: () => 'open' satisfies TaskStatus,
    required: true,
  })
  public status!: TaskStatus

  @prop({
    type: Date,
  })
  public dueDate!: Date

  getDTO(this: Task): TaskDTO {
    return {
      id: this._id.toString(),
      assignee: (<Student> this.assignee).name,
      description: this.description,
      dueDate: this.dueDate,
      status: toCamelCase(this.status),
      title: this.title,
      weekId: '',
      dayIndex: this.dueDate.getDay(),
    }
  }
}

export default <Model<Task>>(models.Task || getModelForClass(Task))
