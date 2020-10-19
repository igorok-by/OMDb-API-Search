import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { getResource } from '../../utils/api'
import { fetchFilms, updatePageCount } from '../../store/actionCreators'

import { List, Avatar, Button } from 'antd'
import { TagOutlined } from '@ant-design/icons'

import './SearchList.scss'

import { ITEMS_PER_PAGE } from '../../utils/constants'
import { IFilmItem } from '../../models'

type SearchListProps = {
  films: IFilmItem[]
  loading: boolean
  isHiddenBtnLoadMore: boolean
  onLoadMore: () => void
}

type SearchListContainerProps = {
  searchSentence: string
  films: IFilmItem[]
  totalResults: number
  currentPage: number
  loading: boolean
  error: Error
  fetchNextPageFilmsData: (searchSentence: string, page: number) => void
  updatePageCount: (newPageCount: number) => void
}

const SearchList: FunctionComponent<SearchListProps> = ({
  films,
  loading,
  isHiddenBtnLoadMore,
  onLoadMore,
}) => {
  const renderItem = (item: IFilmItem) => (
    <List.Item
      className="list__item"
      key={item.id}
      extra={
        <Button type="link">
          <TagOutlined />
        </Button>
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={item.imageSrc} />}
        title={<a href={item.href}>{item.title}</a>}
        description={item.description}
      />
      {item.content}
    </List.Item>
  )

  const btnLoadMore =
    loading || isHiddenBtnLoadMore ? null : (
      <Button type="primary" className="list__load-more" onClick={onLoadMore}>
        Load more...
      </Button>
    )

  return (
    <List
      className="list"
      itemLayout="vertical"
      size="large"
      dataSource={films}
      renderItem={renderItem}
      loading={loading}
      loadMore={btnLoadMore}
    />
  )
}

const SearchListContainer: FunctionComponent<SearchListContainerProps> = ({
  fetchNextPageFilmsData,
  updatePageCount,
  searchSentence,
  films,
  totalResults,
  currentPage,
  loading,
  error,
}) => {
  const handleLoadMore = () => {
    fetchNextPageFilmsData(searchSentence, currentPage + 1)
    updatePageCount(currentPage + 1)
  }

  const isHiddenBtnLoadMore = totalResults <= currentPage * ITEMS_PER_PAGE

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <SearchList
      films={films}
      onLoadMore={handleLoadMore}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchListContainer)
