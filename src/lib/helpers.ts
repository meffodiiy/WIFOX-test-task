import { ToCamelCase, } from '@lib/types'
import { FormEvent, } from 'react'


export const toCamelCase = <const String extends string, > (s: String): ToCamelCase<String> => (
  s.split(' ')
    .map((chunk, index) => index === 0 ? chunk : chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('') as ToCamelCase<String>
)

export const handleSubmit = (callback: (isValid: boolean, data: unknown) => void) => async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const requiredInputs = Array.from(e.currentTarget.elements).filter(elm => (
    ['INPUT', 'TEXTAREA',].includes(elm.tagName) && (elm as HTMLInputElement | HTMLTextAreaElement).required
  )) as (HTMLInputElement | HTMLTextAreaElement)[]

  const invalidInputs = requiredInputs.filter(i => {
    const isInvalid = !i.checkValidity() || i.value.length === 0

    if (isInvalid) {
      i.dispatchEvent(new Event('invalid'))
    }

    return isInvalid
  })

  if (invalidInputs.length === 0) {
    const data = requiredInputs.reduce((acc, input) => ({
      ...acc,
      [input.name]: input.value,
    }), {})

    callback(true, data)
  }
  else {
    callback(false, {})
  }
}
