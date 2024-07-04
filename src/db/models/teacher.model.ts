import { Model, models, } from 'mongoose'
import User from '@db/models/user.model'
import { getModelForClass, prop, Ref, } from '@typegoose/typegoose'
import { Subject, } from '@db/models/subject.model'


export class Teacher extends User {

  @prop({
    ref: () => Subject,
    required: true,
  })
  public subject!: Ref<Subject>
}

export default <Model<Teacher>> (models.Teacher || getModelForClass(Teacher))
