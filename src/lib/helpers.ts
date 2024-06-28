import { ToCamelCase, } from '@lib/types'


export const toCamelCase = <const String extends string, > (s: String): ToCamelCase<String> => (
  s.split(' ')
    .map((chunk, index) => index === 0 ? chunk : chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('') as ToCamelCase<String>
)
