import './styles.sass'
import { Props, } from './types'
import { useEffect, useMemo, useRef, useState, MouseEvent, ChangeEventHandler, ChangeEvent, } from 'react'

export default function SearchSelect <T, > (props: Props<T>) {
  const { minInput = 3, } = props
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)
  const optionsRef = useRef<HTMLDivElement | null>(null)
  const hideOnBlurFunctionRef = useRef<Function>(null)
  const [searchValue, setSearchValue,] = useState('')
  const [isInvalid, setIsInvalid,] = useState(false)

  useEffect(() => {
    const { width, height, } = getComputedStyle(searchInputRef.current!)
    optionsRef.current!.style.width = width
    optionsRef.current!.style.marginTop = height

    hideOnBlurFunctionRef.current = () => {
      setSearchValue('')
      console.log('KEK')
    }
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(false)
    setSearchValue(e.target.value)
  }

  const options = useMemo(() => (
    searchValue.length >= minInput
      ? props.options.filter(option => (
        props.render(option).label.toLowerCase().includes(searchValue.toLowerCase()))
      )
      : []
  ), [minInput, props, searchValue,])

  useEffect(() => {
    if (options.length > 0) {
      window.addEventListener('click', hideOnBlurFunctionRef.current)
    }
    else {
      window.removeEventListener('click', hideOnBlurFunctionRef.current)
    }
  }, [options,])

  const onOptionSelect = (option: T, index: number) => (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    props.onSelect?.(option, index)
    setSearchValue('')
    setTimeout(() => {
      const { label, value, } = props.render(option)
      searchInputRef.current!.value = label
      hiddenInputRef.current!.value = value
    }, 0)
  }

  return (
    <div
      className="search-select"
    >
      <input
        className={`search-select__input ${isInvalid ? 'search-select__input--invalid' : ''}`}
        ref={searchInputRef}
        placeholder={props.placeholder}
        type="text"
        onChange={onChange}
      />
      <input
        name={props.name}
        type="hidden"
        ref={hiddenInputRef}
        required={props.required}
        onInvalid={() => setIsInvalid(true)}
      />
      <div
        className="search-select__options"
        ref={optionsRef}
        style={{ opacity: +(options.length > 0), }}
      >
        {options.map((option, index) => {
          const { key, label, } = props.render(option)
          return (
            <div
              key={key}
              className="search-select__options__option"
              onClick={onOptionSelect(option, index)}
            >
              {label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
