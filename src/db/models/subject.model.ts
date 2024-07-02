import { getModelForClass, } from '@typegoose/typegoose'
import Entity from '@db/models/entity.model'
import { Model, models, } from 'mongoose'


export class Subject extends Entity {}

export default <Model<Subject>> (models.Subject || getModelForClass(Subject))
