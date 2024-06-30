import { buildModel, } from '@db'
import { Schema, } from 'mongoose'


export default buildModel('Subject', new Schema({
  title: {
    type: String,
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date,
    immutable: true,
  },
}))
