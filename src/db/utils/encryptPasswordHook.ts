import { CallbackWithoutResultAndOptionalError, Document, } from 'mongoose'
import bcrypt from 'bcrypt'
import User from '@db/models/user.model'
import { BeAnObject, IObjectWithTypegooseFunction, DocumentType, } from '@typegoose/typegoose/lib/types'


const SALT_WORK_FACTOR = 10


export default function encryptPasswordHook (this: Document<unknown, {}, DocumentType<User>> & Document<unknown, BeAnObject, User> & User & Required<{ _id: string; }> & IObjectWithTypegooseFunction, next: CallbackWithoutResultAndOptionalError) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if (error) return next(error)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
}
