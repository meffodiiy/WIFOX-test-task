import { InputHTMLAttributes, } from 'react'

export type Props = (
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'placeholder' | 'required'
  > & {
    initialValue?: string
    onChange?: (value: string) => void
  }
)
