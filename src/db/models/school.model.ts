import { getModelForClass, } from '@typegoose/typegoose'
import Entity from '@db/models/entity.model'
import { Model, models, } from 'mongoose'


export class School extends Entity {}

export default <Model<School>> (models.School || getModelForClass(School))
