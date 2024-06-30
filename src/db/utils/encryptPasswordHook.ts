import { CallbackWithoutResultAndOptionalError, PreSaveMiddlewareFunction, } from 'mongoose'
import bcrypt from 'bcrypt'


const SALT_WORK_FACTOR = 10


export default function encryptPasswordHook (this: PreSaveMiddlewareFunction, next: CallbackWithoutResultAndOptionalError) {
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
