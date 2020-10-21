import {
  CLEAN_FILMS_DATA,
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_SENTENCE,
  UPDATE_PAGE_COUNT,
  ADD_FILM_TO_BOOKMARKS,
  REMOVE_FILM_FROM_BOOKMARKS,
  UPDATE_FILMS_BOOKMARKING,
} from './actionTypes'

import { Action, State } from '../models'
import { INITIAL_STATE } from '../utils/constants'

const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case CLEAN_FILMS_DATA:
      return {
        ...state,
        films: [],
      }

    case FETCH_FILMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_FILMS_SUCCESS:
      const { isValidSearchValue, items, totalResults } = action.payload

      return {
        ...state,
        isValidSearchValue: isValidSearchValue,
        films: [...state.films, ...items],
        totalResults: totalResults,
        loading: false,
        error: null,
      }

    case FETCH_FILMS_FAILURE:
      return {
        ...state,
        isValidSearchValue: false,
        films: [],
        loading: false,
        error: action.payload,
      }

    case UPDATE_SEARCH_SENTENCE:
      return {
        ...state,
        searchSentence: action.payload,
      }

    case UPDATE_PAGE_COUNT:
      return {
        ...state,
        currentPage: action.payload,
      }

    case ADD_FILM_TO_BOOKMARKS:
      return {
        ...state,
        bookmarkedFilms: [...state.bookmarkedFilms, action.payload],
      }

    case UPDATE_FILMS_BOOKMARKING:
      const updatedWithBookmarks = state.films.map((film) => {
        state.bookmarkedFilms.forEach((bookmarkedFilm) => {
          if (bookmarkedFilm.id === film.id) film.isBookmarked = true
        })
        return film
      })
      return {
        ...state,
        films: updatedWithBookmarks,
      }

    case REMOVE_FILM_FROM_BOOKMARKS:
      const idxOfRemoved = state.bookmarkedFilms.findIndex(
        (film) => film.id === action.payload.id,
      )
      const updatedFilms = state.films.map((film) => {
        if (film.id === action.payload.id) {
          film.isBookmarked = !film.isBookmarked
        }
        return film
      })
      return {
        ...state,
        films: updatedFilms,
        bookmarkedFilms: [
          ...state.bookmarkedFilms.slice(0, idxOfRemoved),
          ...state.bookmarkedFilms.slice(idxOfRemoved + 1),
        ],
      }

    default:
      return state
  }
}

export default reducer
