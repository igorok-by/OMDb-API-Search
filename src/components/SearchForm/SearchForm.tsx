import React, { FunctionComponent } from 'react'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchForm: FunctionComponent = () => {
  return (
    <Form name="search-form">
      <Form.Item name="search-input">
        <Input.Search
          prefix={<SearchOutlined />}
          placeholder="Type your request here"
          enterButton="Search"
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
