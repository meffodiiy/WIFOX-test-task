import SchoolModel, { School, } from '@db/models/school.model'
import GradeModel, { Grade, } from '@db/models/grade.model'
import SubjectModel from '@db/models/subject.model'
import StudentModel from '@db/models/student.model'
import { UserType, } from '@db/models/user.model'
import { createDatabaseConnection, } from '@db/index'


async function seedDatabase () {

  await createDatabaseConnection()

  const schools = <School[]> (await SchoolModel.create([
    'Гімназія-інтернат №13',
    'Альтернативна школа мрійників',
    'Школа №42',
    'Школа «Sigma school»',
    'Ліцей «Єнот»',
  ].map(title => ({ title, }))))

  const grades = <Grade[]> (await GradeModel.create(
    new Array(11)
      .fill(null)
      .map((_, index) => (
        ['А', 'Б', 'В', 'Г',].map(i => ({ title: `${index + 1}-${i}`, }))
      ))
      .flat()
  ))

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

  await StudentModel.create(names.map(name => ({
    name,
    type: UserType.STUDENT,
    password: '$2b$10$D7FmV/FaKy/dqo8iTKoltOZMItjAAhgD/EBX.oOJ.PH7t./Ix.ZLm',
    school: schools[0]._id,
    grade: grades[0]._id,
  })))

  console.log('Database seeded!')
  process.exit(0)
}

seedDatabase()
