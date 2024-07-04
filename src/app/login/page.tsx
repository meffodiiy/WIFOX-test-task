'use client'

import './page.sass'
import Input from '@lib/components/Input'
import * as Texts from '@lib/constants/texts'
import Button from '@lib/components/Button'
import Switch from '@lib/components/Switch'
import { useEffect, useState, } from 'react'
import DisappearBox from '@lib/components/DisappearBox'
import { getSignUpFormData, SignUpFormData, signUp, SignUpData, logIn, LogInData, } from '@/app/login/actions'
import SearchSelect from '@lib/components/SearchSelect'
import { School, } from '@db/models/school.model'
import SwapBox from '@lib/components/SwapBox'
import { Subject, } from '@db/models/subject.model'
import { Grade, } from '@db/models/grade.model'
import Logo from '@lib/components/Logo'
import { handleSubmit, } from '@lib/helpers'


const OPTIONS = [Texts.LOG_IN_TITLE, Texts.SIGN_UP_TITLE,]
const LOG_IN_OPTION_INDEX = 0
const INITIAL_OPTION_INDEX = 0

const USER_TYPES = [
  {
    type: 'student',
    title: Texts.I_AM_STUDENT,
  },
  {
    type: 'teacher',
    title: Texts.I_AM_TEACHER,
  },
]
const STUDENT_OPTION_INDEX = 0
const USER_TYPE_INITIAL_OPTION_INDEX = 0


export default function LoginPage () {
  const [isSignUpModeOn, setIsSignUpModeOn,] = useState(LOG_IN_OPTION_INDEX !== INITIAL_OPTION_INDEX)
  const [signUpData, setSignUpData,] = useState<SignUpFormData>({ schools: [], grades: [], subjects: [], })
  const [isUserTeacher, setIsUserTeacher,] = useState(STUDENT_OPTION_INDEX !== USER_TYPE_INITIAL_OPTION_INDEX)

  useEffect(() => {
    getSignUpFormData().then(setSignUpData)
  }, [])

  const onSubmit = handleSubmit(async (isValid, data) => {
    if (!isValid) return

    const failed = isSignUpModeOn
      ? await signUp(data as SignUpData)
      : await logIn(data as LogInData)

    console.log('SignIn succeed', failed)
  })

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <Logo variant="middle"/>
      <br/>
      <Switch<string>
        name="" required={false}
        options={OPTIONS}
        initialOptionIndex={INITIAL_OPTION_INDEX}
        onSelect={(_, index) => setIsSignUpModeOn(index !== LOG_IN_OPTION_INDEX)}
      />
      <br/>
      <Input name="name" type="text" placeholder={Texts.USERNAME} required/>
      <DisappearBox showIf={isSignUpModeOn}>
        <SearchSelect<School>
          name="school" placeholder={Texts.SCHOOL} required={isSignUpModeOn}
          options={signUpData.schools}
          render={({ _id, title, }) => ({
            key: _id,
            label: title,
            value: _id,
          })}
          onSelect={() => null}
        />
        <Switch<typeof USER_TYPES[number]>
          name="type" required={isSignUpModeOn}
          options={USER_TYPES}
          render={({ title, type, }) => ({ label: title, value: type, })}
          initialOptionIndex={USER_TYPE_INITIAL_OPTION_INDEX}
          onSelect={(_, index) => setIsUserTeacher(index !== STUDENT_OPTION_INDEX)}
          variant="middle"
        />
        <SwapBox
          swapIf={isUserTeacher}
          items={[
            <SearchSelect<Grade>
              key={0}
              name="grade" placeholder={Texts.GRADE} required={isSignUpModeOn && !isUserTeacher}
              options={signUpData.grades}
              render={({ _id, title, }) => ({
                key: _id,
                label: title,
                value: _id,
              })}
              minInput={1}
              onSelect={() => null}
            />,
            <SearchSelect<Subject>
              key={1}
              name="subject" placeholder={Texts.SUBJECT} required={isSignUpModeOn && isUserTeacher}
              options={signUpData.subjects}
              render={({ _id, title, }) => ({
                key: _id,
                label: title,
                value: _id,
              })}
              minInput={1}
              onSelect={() => null}
            />,
          ]}
        />
      </DisappearBox>
      <Input name="password" type="password" placeholder={Texts.PASSWORD} required/>
      <br/>
      <SwapBox
        swapIf={isSignUpModeOn}
        items={[
          <Button type="submit" variant="ok" key={0}>
            {Texts.LOG_IN}
          </Button>,
          <Button type="submit" variant="ok" key={1}>
            {Texts.SIGN_UP}
          </Button>,
        ]}
      />
    </form>
  )
}
