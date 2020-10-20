import { IFilmItem } from './filmTypes'

export type State = {
  isValidSearchValue: boolean
  searchSentence: string
  films: IFilmItem[]
  totalResults: number
  currentPage: number
  loading: boolean
  error: Error | null
  bookmarkedFilms: IFilmItem[]
}

export type Action = {
  type: string
  payload?: any
}
