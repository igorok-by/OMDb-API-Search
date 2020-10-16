import React, { FunctionComponent } from 'react'
import { List, Avatar, Button } from 'antd'
import { TagOutlined } from '@ant-design/icons'

import './SearchList.scss'

import { IListItem } from '../../models'

type SearchListProps = {
  listData: IListItem[]
}

const SearchList: FunctionComponent<SearchListProps> = ({ listData }) => {
  const renderItem = (item: IListItem) => (
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
      dataSource={listData}
      renderItem={renderItem}
    />
  )
}

export default SearchList
