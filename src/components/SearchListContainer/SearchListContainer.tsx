/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react'
import { connect } from 'react-redux'
import FilmsList from '../FilmsList'
import { getResource } from '../../utils/api'
import {
  fetchFilms,
  updatePageCount,
  addFilmToBookmarks,
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
  fetchNextPageFilmsData: (searchSentence: string, page: number) => void
  updatePageCount: (newPageCount: number) => void
  addFilmToBookmarks: (bookmarkedFilm: IFilmItem) => void
}

const SearchListContainer: FunctionComponent<SearchListContainerProps> = ({
  searchSentence,
  films,
  totalResults,
  currentPage,
  loading,
  error,
  fetchNextPageFilmsData,
  updatePageCount,
  addFilmToBookmarks,
}) => {
  const handleLoadMore = useCallback(() => {
    fetchNextPageFilmsData(searchSentence, currentPage + 1)
    updatePageCount(currentPage + 1)
  }, [currentPage, searchSentence])

  const handleBookmarkClick = useCallback(
    (id: string) => {
      const bookmarkedFilm = films.find((film) => film.id === id)

      bookmarkedFilm && addFilmToBookmarks(bookmarkedFilm)
    },
    [films],
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
    fetchNextPageFilmsData: (searchSentence: string, page: number) =>
      fetchFilms(getResource(searchSentence, page), dispatch),
    updatePageCount: (newPageCount: number) =>
      dispatch(updatePageCount(newPageCount)),
    addFilmToBookmarks: (bookmarkedFilm: IFilmItem) =>
      dispatch(addFilmToBookmarks(bookmarkedFilm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchListContainer)
