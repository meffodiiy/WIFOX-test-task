import { ButtonHTMLAttributes, } from 'react'

export type ButtonVariant = 'default' | 'ok' | 'danger'

export type Props = (
  Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'disabled'
  > & {
    children: string
    variant?: ButtonVariant
    onClick?: () => void
  }
)
