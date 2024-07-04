import { getModelForClass, } from '@typegoose/typegoose'
import Entity from '@db/models/entity.model'
import { Model, models, } from 'mongoose'
import { ToDTO, } from '@db/types'


export type GradeDTO = Pick<Grade, 'title'> & {
  id: Grade['_id']
}


export class Grade extends Entity implements ToDTO<GradeDTO> {

  getDTO(this: Grade): GradeDTO {
    return {
      id: this._id.toString(),
      title: this.title,
    }
  }
}

export default <Model<Grade>> (models.Grade || getModelForClass(Grade))
