import { Pacifico, } from 'next/font/google'
import * as Texts  from '@lib/constants/texts'
import './styles.sass'
import { Props, } from './types'


const pacifico = Pacifico({ weight: '400', subsets: ['cyrillic',], })


export default function Logo (props: Props) {
  const { variant = 'big', } = props
  return (
    <span className={`logo logo--${variant} ${pacifico.className}`}>
      {Texts.APP_NAME}
    </span>
  )
}
