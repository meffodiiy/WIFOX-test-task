'use server'

import SchoolModel, { School, } from '@db/models/school.model'
import GradeModel, { Grade, } from '@db/models/grade.model'
import SubjectModel, { Subject, } from '@db/models/subject.model'

export async function getSignUpData () {

  return {
    schools: <School[]> await SchoolModel.find(),
    grades: <Grade[]> await GradeModel.find(),
    subjects: <Subject[]> await SubjectModel.find(),
  }

}
