import { Model, models, } from 'mongoose'
import { getModelForClass, prop, Ref, } from '@typegoose/typegoose'
import User from '@db/models/user.model'
import { Grade, } from '@db/models/grade.model'


export class Student extends User {

  @prop({
    ref: () => Grade,
    required: true,
  })
  public grade!: Ref<Grade>
}

export default <Model<Student>> (models.Student || getModelForClass(Student))
