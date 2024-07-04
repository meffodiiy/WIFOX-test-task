import { prop, } from '@typegoose/typegoose'

export default class Base {

  public _id!: string

  @prop({
    type: Date,
    default: () => new Date,
    immutable: true,
  })
  public createdAt!: Date
}
