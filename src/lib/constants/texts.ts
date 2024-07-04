import { TaskStatusKey, } from '@lib/classes/TaskManager/types'

export const APP_NAME = 'Шарага'
export const APP_DESCRIPTION = 'Новітній електронний щоденник'
export const USERNAME = 'Ваше ім\'я'
export const PASSWORD = 'Пароль'
export const SCHOOL = 'Школа'
export const GRADE = 'Клас'
export const STUDENT = 'Студент'
export const SUBJECT = 'Предмет'
export const I_AM_STUDENT = 'Я учень'
export const I_AM_TEACHER = 'Я вчитель'
export const LOG_IN_TITLE = 'Вхід'
export const SIGN_UP_TITLE = 'Реєстрація'
export const LOG_IN = 'Увійти'
export const LOG_OUT = 'Вихід'
export const SIGN_UP = 'Зареєструватися'
export const ADD_TASK = '+ Додати'
export const DONE = 'Готово'
export const TITLE = 'Заголовок'
export const DESCRIPTION = 'Опис'



export const TASK_STATUS_NAMES: Record<TaskStatusKey, string> = {
  open: 'До виконання',
  inProgress: 'Виконується',
  completed: 'Завершено',
}
