import Base from '@db/models/base.model'
import { School, } from '@db/models/school.model'
import { pre, prop, Ref, } from '@typegoose/typegoose'
import encryptPasswordHook from '@db/utils/encryptPasswordHook'
import comparePasswordMethod from '@db/utils/comparePasswordMethod'
import { ToDTO, } from '@db/types'


export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export type UserDTO = Pick<User, 'name' | 'type'> & {
  id: string
  isTeacher: boolean
}


@pre<User>('save', function (next) {
  encryptPasswordHook.call(this, next)
})
export default class User extends Base implements ToDTO<UserDTO> {

  @prop({
    type: String,
    required: true,
    immutable: true,
  })
  public name!: string

  @prop({
    type: String,
    required: true,
    immutable: true,
  })
  public password!: string

  @prop({
    type: String,
    enum: [UserType.STUDENT, UserType.TEACHER,],
  })
  public type!: UserType

  @prop({
    ref: () => School,
    required: true,
  })
  public school!: Ref<School>

  public comparePassword (this: User, password: string): Promise<boolean> {
    return comparePasswordMethod.call(this, password)
  }

  getDTO(this: User): UserDTO {
    return {
      id: this._id.toString(),
      name: this.name,
      type: this.type,
      isTeacher: this.type === UserType.TEACHER,
    }
  }
}
