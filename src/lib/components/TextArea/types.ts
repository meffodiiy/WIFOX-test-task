import { TextareaHTMLAttributes, } from 'react'

export type Props = (
  Pick<
    TextareaHTMLAttributes<HTMLInputElement>,
    'name' | 'placeholder' | 'required'
  > & {
    initialValue?: string
    onChange?: (value: string) => void
    minHeight?: number
  }
)
