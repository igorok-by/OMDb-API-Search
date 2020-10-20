/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react'
import { connect } from 'react-redux'
import FilmsList from '../FilmsList'
import { addFilmToBookmarks } from '../../store/actionCreators'

import { IFilmItem } from '../../models'

type BookmarksContainerProps = {
  bookmarkedFilms: IFilmItem[]
  loading: boolean
  error: Error
  addFilmToBookmarks: (bookmarkedFilm: IFilmItem) => void
}

const BookmarksContainer: FunctionComponent<BookmarksContainerProps> = ({
  bookmarkedFilms,
  loading,
  error,
  addFilmToBookmarks,
}) => {
  // const handleBookmarkClick = useCallback(
  //   (id: string) => {
  //     const bookmarkedFilm = films.find((film) => film.id === id)

  //     bookmarkedFilm && addFilmToBookmarks(bookmarkedFilm)
  //   },
  //   [films],
  // )

  return error ? (
    <h1>{error.message}</h1>
  ) : (
    <FilmsList films={bookmarkedFilms} loading={loading} isHiddenBtnLoadMore />
  )
}

const mapStateToProps = (state: BookmarksContainerProps) => state

const mapDispatchToProps = (dispatch: any) => {
  return {
    addFilmToBookmarks: (bookmarkedFilm: IFilmItem) =>
      dispatch(addFilmToBookmarks(bookmarkedFilm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksContainer)
