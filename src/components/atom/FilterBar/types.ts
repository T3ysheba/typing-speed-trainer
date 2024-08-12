export type TFiltersProps = {
  textType: string[]
  textToggler: (state: string) => void
  onTimeSetClick: (time: number) => void
  totalTime: number
}
