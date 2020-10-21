/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react'
import { connect } from 'react-redux'
import FilmsList from '../FilmsList'
import { removeFilmFromBookmarks } from '../../store/actionCreators'

import { IFilmItem } from '../../models'

type BookmarksContainerProps = {
  bookmarkedFilms: IFilmItem[]
  loading: boolean
  removeFilmFromBookmarks: (bookmarkedFilm: IFilmItem) => void
}

const BookmarksContainer: FunctionComponent<BookmarksContainerProps> = ({
  bookmarkedFilms,
  loading,
  removeFilmFromBookmarks,
}) => {
  const handleBookmarkClick = useCallback(
    (id: string) => {
      const clickedFilm = bookmarkedFilms.find((film) => film.id === id)

      clickedFilm && removeFilmFromBookmarks(clickedFilm)
    },
    [bookmarkedFilms],
  )

  return (
    <FilmsList
      films={bookmarkedFilms}
      onBookmarkClick={handleBookmarkClick}
      loading={loading}
      isHiddenBtnLoadMore
    />
  )
}

const mapStateToProps = ({
  bookmarkedFilms,
  loading,
}: {
  bookmarkedFilms: IFilmItem[]
  loading: boolean
}) => ({
  bookmarkedFilms,
  loading,
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFilmFromBookmarks: (bookmarkedFilm: IFilmItem) =>
      dispatch(removeFilmFromBookmarks(bookmarkedFilm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksContainer)
