import { State } from '../models'

export const OMDB_API_KEY: string = '50fb5534'
export const BASE_URL: string = 'https://www.omdbapi.com/?'
export const ITEMS_PER_PAGE: number = 10
export const FIRST_PAGE_NUMBER: number = 1

export const INITIAL_STATE: State = {
  isValidSearchValue: true,
  searchSentence: 'man',
  films: [],
  totalResults: 0,
  currentPage: FIRST_PAGE_NUMBER,
  loading: true,
  error: null,
  bookmarkedFilms: [],
}
