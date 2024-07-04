import bcrypt from 'bcrypt'
import User from '@db/models/user.model'


export default function comparePasswordMethod (this: User, password: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
}
