import {
  FETCH_FILMS_REQUEST,
  FETCH_FILMS_SUCCESS,
  FETCH_FILMS_FAILURE,
  UPDATE_SEARCH_SENTENCE,
} from './actionTypes'

import { Action, State } from '../models'

const initialState: State = {
  isValidSearchValue: true,
  searchSentence: 'hello world',
  films: [],
  totalResults: 0,
  pageCount: 1,
  loading: true,
  error: null,
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_FILMS_REQUEST:
      return {
        ...state,
        films: [],
        loading: true,
        error: null,
      }

    case FETCH_FILMS_SUCCESS:
      return {
        ...state,
        films: action.payload,
        loading: false,
        error: null,
      }

    case FETCH_FILMS_FAILURE:
      return {
        ...state,
        films: [],
        loading: false,
        error: action.payload,
      }

    case UPDATE_SEARCH_SENTENCE:
      return {
        ...state,
        searchSentence: action.payload,
      }

    default:
      return state
  }
}

export default reducer
