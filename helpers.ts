export const toCamelCase = (s: string): string => (
  s.split(' ')
    .map((chunk, index) => index === 0 ? chunk : chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('')
)
