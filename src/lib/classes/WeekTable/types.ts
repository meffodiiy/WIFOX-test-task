export type Week = {
  starts: Date
  ends: Date
}

export type WeekDTO = Week & {
  id: string
}
