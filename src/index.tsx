import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import throttle from 'lodash.throttle'
import './styles/index.scss'

import { INITIAL_STATE } from './utils/constants'
import {
  loadBookmarksFromLocal,
  saveBookmarksToLocal,
} from './utils/localStorage'
import reducer from './store/reducer'
import App from '../src/components/App'

const bookmarkedFilms = loadBookmarksFromLocal()
const persistedState = bookmarkedFilms
  ? { ...INITIAL_STATE, bookmarkedFilms }
  : INITIAL_STATE

const store = createStore(reducer, persistedState)

store.subscribe(
  throttle(() => {
    saveBookmarksToLocal({
      bookmarkedFilms: store.getState().bookmarkedFilms,
    })
  }, 1000),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
