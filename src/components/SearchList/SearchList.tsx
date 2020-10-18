import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { List, Avatar, Button } from 'antd'
import { TagOutlined } from '@ant-design/icons'

import './SearchList.scss'

import { IFilmItem } from '../../models'

type SearchListProps = {
  films: IFilmItem[]
}

const SearchList: FunctionComponent<SearchListProps> = ({ films }) => {
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

  return (
    <List
      className="list"
      itemLayout="vertical"
      size="large"
      dataSource={films}
      renderItem={renderItem}
    />
  )
}

const SearchListContainer = ({
  films,
  loading,
  error,
}: {
  films: IFilmItem[]
  loading: boolean
  error: Error
}) => {
  if (loading) {
    return <h1>Loading...(Spinner)</h1>
  }

  if (error) {
    return <h1>Error happened</h1>
  }

  return <SearchList films={films} />
}

const mapStateToProps = ({
  films,
  loading,
  error,
}: {
  films: IFilmItem[]
  loading: boolean
  error: Error
}) => {
  return { films, loading, error }
}

export default connect(mapStateToProps)(SearchListContainer)
