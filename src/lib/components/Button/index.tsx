import './styles.sass'
import { Props, } from './types'

export default function Button ({
  variant = 'default',
  ...props
}: Props) {
  return (
    <button
      className={`button button--${variant} ${props.disabled ? 'button--disabled' : ''}`}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
