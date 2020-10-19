import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getResource } from '../../utils/api'
import { fetchFilms, updateSearchSentence } from '../../store/actionCreators'

import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchForm = ({
  handleSearch,
}: {
  handleSearch: (value: string) => void
}) => {
  return (
    <Form name="search-form">
      <Form.Item name="search-input">
        <Input.Search
          prefix={<SearchOutlined />}
          placeholder="Type your request here"
          enterButton="Search"
          onSearch={(value) => handleSearch(value)}
        />
      </Form.Item>
    </Form>
  )
}

const SearchFormContainer = ({
  searchSentence,
  pageCount,
  fetchFilmsData,
  updateSearchSentence,
}: {
  searchSentence: string
  pageCount: number
  fetchFilmsData: (searchValue: string, page: number) => void
  updateSearchSentence: (searchValue: string) => void
}) => {
  useEffect(() => {
    fetchFilmsData(searchSentence, pageCount)
  }, [fetchFilmsData, pageCount, searchSentence])

  const handleSearch = (searchValue: string) => {
    updateSearchSentence(searchValue)
  }

  return <SearchForm handleSearch={handleSearch} />
}

const mapStateToProps = ({
  searchSentence,
  pageCount,
}: {
  searchSentence: string
  pageCount: number
}) => ({
  searchSentence,
  pageCount,
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilmsData: (searchValue: string, page: number) =>
      fetchFilms(getResource(searchValue, page), dispatch),
    updateSearchSentence: (searchSentence: string) =>
      dispatch(updateSearchSentence(searchSentence)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
