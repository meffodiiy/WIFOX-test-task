import bcrypt from 'bcrypt'


export default function comparePasswordMethod (password: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
}
