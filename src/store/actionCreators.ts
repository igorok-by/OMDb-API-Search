import {
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_SENTENCE,
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

const updateSearchSentence = (searchSentence: string) => ({
  type: UPDATE_SEARCH_SENTENCE,
  payload: searchSentence,
})

const fetchFilms = (getData: Promise<IFilmsData>, dispatch: any) => {
  dispatch(filmsRequested())
  getData
    .then((data) => dispatch(filmsLoaded(data)))
    .catch((err: Error) => dispatch(filmsError(err)))
}

export { updateSearchSentence, fetchFilms }
