/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react'
import { connect } from 'react-redux'
import FilmsList from '../FilmsList'
import { getResource } from '../../utils/api'
import {
  fetchFilms,
  updatePageCount,
  addFilmToBookmarks,
  removeFilmFromBookmarks,
} from '../../store/actionCreators'

import { ITEMS_PER_PAGE } from '../../utils/constants'
import { IFilmItem } from '../../models'

type SearchListContainerProps = {
  searchSentence: string
  films: IFilmItem[]
  totalResults: number
  currentPage: number
  loading: boolean
  error: Error
  bookmarkedFilms: IFilmItem[]
  fetchNextPageFilmsData: (
    searchSentence: string,
    page: number,
    bookmarkedFilms: IFilmItem[],
  ) => void
  updatePageCount: (newPageCount: number) => void
  addFilmToBookmarks: (bookmarkedFilm: IFilmItem) => void
  removeFilmFromBookmarks: (bookmarkedFilm: IFilmItem) => void
}

const SearchListContainer: FunctionComponent<SearchListContainerProps> = ({
  searchSentence,
  films,
  totalResults,
  currentPage,
  loading,
  error,
  bookmarkedFilms,
  fetchNextPageFilmsData,
  updatePageCount,
  addFilmToBookmarks,
  removeFilmFromBookmarks,
}) => {
  const handleLoadMore = useCallback(() => {
    fetchNextPageFilmsData(searchSentence, currentPage + 1, bookmarkedFilms)
    updatePageCount(currentPage + 1)
  }, [currentPage, searchSentence])

  const handleBookmarkClick = useCallback(
    (id: string) => {
      const clickedFilm = films.find((film) => film.id === id)

      if (clickedFilm) {
        clickedFilm.isBookmarked = !clickedFilm.isBookmarked

        clickedFilm.isBookmarked
          ? addFilmToBookmarks(clickedFilm)
          : removeFilmFromBookmarks(clickedFilm)
      }
    },
    [films, bookmarkedFilms],
  )

  const isHiddenBtnLoadMore = totalResults <= currentPage * ITEMS_PER_PAGE

  return error ? (
    <h1>{error.message}</h1>
  ) : (
    <FilmsList
      films={films}
      onLoadMore={handleLoadMore}
      onBookmarkClick={handleBookmarkClick}
      loading={loading}
      isHiddenBtnLoadMore={isHiddenBtnLoadMore}
    />
  )
}

const mapStateToProps = (state: SearchListContainerProps) => state

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchNextPageFilmsData: (
      searchSentence: string,
      page: number,
      bookmarkedFilms: IFilmItem[],
    ) =>
      fetchFilms(getResource(searchSentence, page), bookmarkedFilms, dispatch),
    updatePageCount: (newPageCount: number) =>
      dispatch(updatePageCount(newPageCount)),
    addFilmToBookmarks: (bookmarkedFilm: IFilmItem) =>
      dispatch(addFilmToBookmarks(bookmarkedFilm)),
    removeFilmFromBookmarks: (bookmarkedFilm: IFilmItem) =>
      dispatch(removeFilmFromBookmarks(bookmarkedFilm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchListContainer)
