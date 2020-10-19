import { IFilmsData } from './filmTypes'

export type State = {
  isValidSearchValue: boolean
  searchSentence: string
  films: IFilmsData[]
  totalResults: number
  currentPage: number
  loading: boolean
  error: any
}

export type Action = {
  type: string
  payload?: any
}
