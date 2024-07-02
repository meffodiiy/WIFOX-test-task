import { getModelForClass, } from '@typegoose/typegoose'
import Entity from '@db/models/entity.model'
import { Model, models, } from 'mongoose'


export class Grade extends Entity {}

export default <Model<Grade>> (models.Grade || getModelForClass(Grade))
