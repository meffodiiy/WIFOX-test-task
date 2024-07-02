'use client'

import './styles.sass'
import { Props, } from './types'
import { ChangeEventHandler, useState, } from 'react'

export default function Input (props: Props) {
  const [value, setValue,] = useState(props.initialValue ?? '')
  const [isInvalid, setIsInvalid,] = useState(false)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsInvalid(false)
    setValue(e.target.value)
    props.onChange?.(e.target.value)
  }

  return (
    <input
      className={`input ${isInvalid ? 'input--invalid' : ''}`}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      value={value}
      onChange={onChange}
      required={props.required}
      onInvalid={() => setIsInvalid(true)}
    />
  )
}
