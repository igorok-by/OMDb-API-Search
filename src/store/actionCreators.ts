import {
  CLEAN_FILMS_DATA,
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_SENTENCE,
  UPDATE_PAGE_COUNT,
} from '../store/actionTypes'
import { IFilmsData } from '../models'

const cleanFilms = () => ({
  type: CLEAN_FILMS_DATA,
})

const filmsRequested = () => ({
  type: FETCH_FILMS_REQUEST,
})

const filmsLoaded = (filmsData: IFilmsData) => ({
  type: FETCH_FILMS_SUCCESS,
  payload: filmsData,
})

const filmsError = (error: Error) => ({
  type: FETCH_FILMS_FAILURE,
  payload: error,
})

const updateSearchSentence = (searchSentence: string) => ({
  type: UPDATE_SEARCH_SENTENCE,
  payload: searchSentence,
})

const updatePageCount = (newPageCount: number) => ({
  type: UPDATE_PAGE_COUNT,
  payload: newPageCount,
})

const fetchFilms = (getData: Promise<IFilmsData>, dispatch: any) => {
  dispatch(filmsRequested())
  getData
    .then((data) => {
      if (data.isValidSearchValue) {
        return dispatch(filmsLoaded(data))
      } else {
        throw new Error("Sorry, we couldn't find any results for your request")
      }
    })
    .catch((err: Error) => dispatch(filmsError(err)))
}

export { cleanFilms, updateSearchSentence, updatePageCount, fetchFilms }
