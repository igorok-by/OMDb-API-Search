import {
  CLEAN_FILMS_DATA,
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_SENTENCE,
  UPDATE_PAGE_COUNT,
  ADD_FILM_TO_BOOKMARKS,
  REMOVE_FILM_FROM_BOOKMARKS,
} from '../store/actionTypes'
import { IFilmItem, IFilmsData } from '../models'

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

const addFilmToBookmarks = (bookmarkedFilm: IFilmItem) => ({
  type: ADD_FILM_TO_BOOKMARKS,
  payload: bookmarkedFilm,
})

const removeFilmFromBookmarks = (bookmarkedFilm: IFilmItem) => ({
  type: REMOVE_FILM_FROM_BOOKMARKS,
  payload: bookmarkedFilm,
})

const fetchFilms = (
  getData: Promise<IFilmsData>,
  bookmarkedFilms: IFilmItem[],
  dispatch: any,
) => {
  dispatch(filmsRequested())

  getData
    .then((data) => {
      if (data.isValidSearchValue) {
        let updatedWithBookmarks: IFilmItem[] = []

        if (data && data.items) {
          updatedWithBookmarks = data.items.map((item) => {
            bookmarkedFilms.forEach((film) => {
              if (film.id === item.id) item.isBookmarked = true
            })
            return item
          })
        }

        return dispatch(filmsLoaded({ ...data, items: updatedWithBookmarks }))
      } else {
        throw new Error("Sorry, we couldn't find any results for your request")
      }
    })
    .catch((err: Error) => dispatch(filmsError(err)))
}

export {
  cleanFilms,
  updateSearchSentence,
  updatePageCount,
  fetchFilms,
  addFilmToBookmarks,
  removeFilmFromBookmarks,
}
