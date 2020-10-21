/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react'
import { connect } from 'react-redux'
import FilmsList from '../FilmsList'
import { removeFilmFromBookmarks } from '../../store/actionCreators'

import { IFilmItem } from '../../models'

type BookmarksContainerProps = {
  bookmarkedFilms: IFilmItem[]
  loading: boolean
  error: Error
  removeFilmFromBookmarks: (bookmarkedFilm: IFilmItem) => void
}

const BookmarksContainer: FunctionComponent<BookmarksContainerProps> = ({
  bookmarkedFilms,
  loading,
  error,
  removeFilmFromBookmarks,
}) => {
  const handleBookmarkClick = useCallback(
    (id: string) => {
      const clickedFilm = bookmarkedFilms.find((film) => film.id === id)

      clickedFilm && removeFilmFromBookmarks(clickedFilm)
    },
    [bookmarkedFilms],
  )

  return error ? (
    <h1>{error.message}</h1>
  ) : (
    <FilmsList
      films={bookmarkedFilms}
      onBookmarkClick={handleBookmarkClick}
      loading={loading}
      isHiddenBtnLoadMore
    />
  )
}

const mapStateToProps = (state: BookmarksContainerProps) => state

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFilmFromBookmarks: (bookmarkedFilm: IFilmItem) =>
      dispatch(removeFilmFromBookmarks(bookmarkedFilm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksContainer)
