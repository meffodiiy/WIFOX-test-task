'use client'

import './styles.sass'
import { Props, } from './types'
import { ChangeEventHandler, useCallback, useEffect, useRef, useState, } from 'react'

export default function TextArea (props: Props) {
  const [value, setValue,] = useState(props.initialValue ?? '')
  const [isInvalid, setIsInvalid,] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const textAreaAutoExpand = useCallback(() => {
    if (!textAreaRef.current) return

    const scrollHeight = textAreaRef.current!.scrollHeight
    const height = (props?.minHeight && props.minHeight > scrollHeight)
      ? props.minHeight
      : scrollHeight

    textAreaRef.current!.style.height = '0px'
    textAreaRef.current!.style.height = height + 'px'
  }, [props.minHeight,])

  useEffect(() => {
    textAreaAutoExpand()
  }, [textAreaAutoExpand,])

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    textAreaAutoExpand()
    setIsInvalid(false)
    setValue(e.target.value)
    props.onChange?.(e.target.value)
  }

  return (
    <textarea
      className={`textarea ${isInvalid ? 'textarea--invalid' : ''}`}
      ref={textAreaRef}
      name={props.name}
      placeholder={props.placeholder}
      value={value}
      onChange={onChange}
      required={props.required}
      onInvalid={() => setIsInvalid(true)}
    />
  )
}
