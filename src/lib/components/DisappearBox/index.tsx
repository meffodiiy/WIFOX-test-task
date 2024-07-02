import './styles.sass'
import { useEffect, useRef, useState, } from 'react'
import { Props, } from './types'

export default function DisappearBox (props: Props) {
  const disappearBoxRef = useRef<HTMLDivElement | null>(null)
  const disappearBoxContentRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight,] = useState<string>('0px')

  useEffect(() => {
    setHeight(props.showIf ? getComputedStyle(disappearBoxContentRef.current!).height : '0px')
  }, [props.showIf,])

  return (
    <div
      className="disappear-box"
      ref={disappearBoxRef}
      style={{ height, }}
    >
      <div
        className="disappear-box__content"
        ref={disappearBoxContentRef}
      >
        {props.children}
      </div>
    </div>
  )
}
