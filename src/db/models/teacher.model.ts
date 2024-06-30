import { Schema, SchemaTypes, } from 'mongoose'
import { buildModel, } from '@db'
import encryptPasswordHook from '@db/utils/encryptPasswordHook'
import comparePasswordMethod from '@db/utils/comparePasswordMethod'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Subject',
    },
  ],
  school: {
    type: SchemaTypes.ObjectId,
    ref: 'School',
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date,
    immutable: true,
  },
})

schema.pre('save', encryptPasswordHook)
schema.methods.comparePassword = comparePasswordMethod

export default buildModel('Teacher', schema)
