import Student from '@db/models/student.model'
import SchoolModel from '@db/models/school.model'
import GradeModel from '@db/models/grade.model'
import SubjectModel from '@db/models/subject.model'
import { createDatabaseConnection, } from './'


export default async function seedDatabase () {

  await SchoolModel.create([
    'Гімназія-інтернат №13',
    'Альтернативна школа мрійників',
    'Школа №42',
    'Школа «Sigma school»',
    'Ліцей «Єнот»',
  ].map(title => ({ title, })))

  await GradeModel.create(
    new Array(11)
      .fill(null)
      .map((_, index) => (
        ['А', 'Б', 'В', 'Г',].map(i => ({ title: `${index + 1}-${i}`, }))
      ))
      .flat()
  )

  await SubjectModel.create([
    'Фізика',
    'Математика',
    'Укр. мова',
    'Англ. мова',
    'Фіз. виховання',
    'Історія',
    'Хімія',
    'Біологія',
  ].map(title => ({ title, })))

  const maleNames = 'Ахілес, Ізмаїл, Принц, Одисей, Тамерлан, Осман, Соломон, Еней, Царь, Мойсей, Рожден, Варфоломій, Куонг Кионг, Сулейман, Ксенофонт, Златослав'
  const femaleNames = 'Октавія, Феліція, Меліса, Божена, Весняна, Камільєна, Кассандра, Мальвіна, Санта, Квітослава, Сапфіра, Тіша, Юнона, Афіна, Есмеральда, Мадонна, Жасмін, Іскра, Златослава, Квітка, Імпєрія, Росінка, Флорентіна, Герда, Мелодісон, Іллінка, Аврора'
  const names = (maleNames + ', ' + femaleNames).split(', ')


  // TODO: fill with tasks

  console.log('Database seeded!')
}
