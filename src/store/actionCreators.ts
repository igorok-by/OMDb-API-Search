import {
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_VALUE,
} from '../store/actionTypes'
import { IFilmsData } from '../models'

const filmsRequested = () => ({
  type: FETCH_FILMS_REQUEST,
})

const filmsLoaded = (films: IFilmsData) => ({
  type: FETCH_FILMS_SUCCESS,
  payload: films.items,
})

const filmsError = (error: Error) => ({
  type: FETCH_FILMS_FAILURE,
  payload: error,
})

const updateSearchValue = (searchValue: string) => ({
  type: UPDATE_SEARCH_VALUE,
  payload: searchValue,
})

const fetchFilms = (
  getResource: (searchValue: string, pageCount: number) => Promise<IFilmsData>,
  dispatch: any,
) => () => {
  console.log('1')
  dispatch(filmsRequested())
  getResource('monkey', 1)
    .then((data) => dispatch(filmsLoaded(data)))
    .catch((err: Error) => dispatch(filmsError(err)))
}

export { updateSearchValue, fetchFilms }
