import React, { FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import { getResource } from '../../utils/api'
import { fetchFilms } from '../../store/actionCreators'

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

const SearchFormContainer = ({
  searchValue,
  fetchFilms,
}: {
  searchValue: string
  fetchFilms: () => void
}) => {
  useEffect(() => {
    console.log('useEffect')
    fetchFilms()
  }, [fetchFilms])

  return <SearchForm />
}

const mapStateToProps = ({ searchValue }: { searchValue: string }) => ({
  searchValue,
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilms: fetchFilms(getResource, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
