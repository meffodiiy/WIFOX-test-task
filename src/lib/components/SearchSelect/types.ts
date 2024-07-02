import { InputHTMLAttributes, } from 'react'

export type Props<T, > = (
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'placeholder' | 'required'
  > & {
    options: T[]
    render: (option: T) => { key: string | number, label: string, value: string }
    onSelect?: (option: T, index: number) => void
    minInput?: number
  }
)
