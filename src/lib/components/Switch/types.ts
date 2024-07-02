export type SwitchVariants = 'middle' | 'small'

export type Props <T, > = (
  Pick<
    HTMLInputElement,
    'name' | 'required'
  > & {
    options: T[]
    render?: (option: T) => { label: string, value: string }
    initialOptionIndex?: number
    onSelect?: (option: T, index: number) => void
    variant?: SwitchVariants
  }
)
