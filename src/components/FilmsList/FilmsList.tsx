/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react'

import { List, Avatar, Button } from 'antd'
import { TagOutlined } from '@ant-design/icons'

import './FilmsList.scss'

import { IFilmItem } from '../../models'

type FilmsListProps = {
  films: IFilmItem[]
  loading: boolean
  isHiddenBtnLoadMore: boolean
  onLoadMore?: () => void
  onBookmarkClick: (id: string) => void
}

const FilmsList: FunctionComponent<FilmsListProps> = ({
  films,
  loading,
  isHiddenBtnLoadMore,
  onLoadMore,
  onBookmarkClick,
}) => {
  const renderItem = (item: IFilmItem) => (
    <List.Item
      className="list__item"
      key={item.id}
      extra={
        <Button
          size="large"
          danger={item.isBookmarked}
          type="link"
          onClick={() => onBookmarkClick && onBookmarkClick(item.id)}
        >
          <TagOutlined />
        </Button>
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={item.imageSrc} className="list__avatar" />}
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

  return films ? (
    <List
      className="list"
      itemLayout="vertical"
      size="large"
      dataSource={films}
      renderItem={renderItem}
      loading={loading}
      loadMore={btnLoadMore}
    />
  ) : (
    <h1>There're no films. Try to search something! :)</h1>
  )
}

export default FilmsList
