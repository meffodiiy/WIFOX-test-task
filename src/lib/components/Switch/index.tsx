'use client'

import './styles.sass'
import { Props, } from './types'
import { useEffect, useMemo, useRef, useState, } from 'react'


export default function Switch <T, > (props: Props<T>) {
  const {
    initialOptionIndex = 0,
    render = (option: string) => ({ label: option, value: option, }),
  } = props

  const switchRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<Array<HTMLButtonElement>>([])
  const [selectedOptionIndex, setSelectedOptionIndex,] = useState(initialOptionIndex)
  const [togglerBounds, setTogglerBounds,] = useState<Record<'width' | 'height' | 'left', string> | undefined>(undefined)

  useEffect(() => {
    defineTogglerBounds(initialOptionIndex)
  }, [initialOptionIndex,])

  const defineTogglerBounds = (optionIndex: number) => {
    const option = optionRefs.current[optionIndex]
    const { width, height, } = getComputedStyle(option)
    const left = `${option.getBoundingClientRect().left - switchRef.current!.getBoundingClientRect().left}px`
    setTogglerBounds({ width, height, left, })
  }

  const onOptionClick = (option: T, index: number) => () => {
    setSelectedOptionIndex(index)
    defineTogglerBounds(index)
    props.onSelect?.(option, index)
  }

  const value = useMemo(() => (
    render(props.options[selectedOptionIndex]).value
  ), [props.options, render, selectedOptionIndex,])

  return (
    <div
      className="switch"
      ref={switchRef}
    >
      <div
        className="switch__toggler"
        style={togglerBounds}
      />
      {props.options.map((option, index) => (
        <button
          key={index} type="button"
          className={`switch__option ${selectedOptionIndex === index ? 'switch__option--selected' : ''} ${props.variant ? `switch__option--${props.variant}` : ''}`}
          ref={ref => void optionRefs.current.push(ref!)}
          onClick={onOptionClick(option, index)}
        >
          {render(option).label}
        </button>
      ))}
      <input name={props.name} type="hidden" value={value} required={props.required}/>
    </div>
  )
}
