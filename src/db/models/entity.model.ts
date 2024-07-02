import { prop, } from '@typegoose/typegoose'

export default class Entity {

  public _id: string

  @prop({ type: String, required: true, immutable: true, })
  public title: string

  @prop({ type: Date, default: () => new Date, immutable: true, })
  public createdAt: Date
}
