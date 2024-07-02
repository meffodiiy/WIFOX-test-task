import './styles.sass'
import { Props, } from './types'

export default function SwapBox (props: Props) {
  return (
    <div
      className="swap-box"
    >
      <div
        className={`swap-box__item swap-box__item${props.swapIf ? '--hidden' : ''}`}
      >
        {props.items[0]}
      </div>
      <div
        className={`swap-box__item swap-box__item${props.swapIf ? '' : '--hidden'}`}
      >
        {props.items[1]}
      </div>
    </div>
  )
}
