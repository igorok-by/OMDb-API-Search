import {
  CLEAN_FILMS_DATA,
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_SENTENCE,
  UPDATE_PAGE_COUNT,
} from './actionTypes'

import { FIRST_PAGE_NUMBER } from '../utils/constants'

import { Action, State } from '../models'

const initialState: State = {
  isValidSearchValue: true,
  searchSentence: 'hello world',
  films: [],
  totalResults: 0,
  currentPage: FIRST_PAGE_NUMBER,
  loading: true,
  error: null,
}

const reducer = (state: State = initialState, action: Action) => {
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

    default:
      return state
  }
}

export default reducer
