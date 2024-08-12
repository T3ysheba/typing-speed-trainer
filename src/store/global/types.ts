export type TTextType = {
  type: string
  content: string
}

export type TGlobalState = {
  data: TTextType[] | null
  error: any
  loading: boolean
}
