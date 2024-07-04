import { prop, } from '@typegoose/typegoose'
import Base from '@db/models/base.model'

export default class Entity extends Base {

  @prop({
    type: String,
    required: true,
    immutable: true,
  })
  public title!: string
}
