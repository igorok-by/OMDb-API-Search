import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { connect } from 'react-redux'
import { getResource } from '../../utils/api'
import { FIRST_PAGE_NUMBER } from '../../utils/constants'
import {
  cleanFilms,
  updateSearchSentence,
  updatePageCount,
  fetchFilms,
} from '../../store/actionCreators'

import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

type SearchFormContainerProps = {
  searchSentence: string
  currentPage: number
  fetchFilmsData: (searchValue: string, page: number) => void
  updateSearchSentence: (searchValue: string) => void
  cleanFilms: () => void
  updatePageCount: (newPageCount: number) => void
}

type SearchFormProps = {
  handleSearch: (searchValue: string) => void
}

const SearchForm: FunctionComponent<SearchFormProps> = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState('')

  const onChange = (evt: any) => {
    evt.target && setInputValue(evt.target.value)
  }

  const onSearch = (inputValue: string) => {
    setInputValue('')

    const searchValue = inputValue.trim().toLowerCase()
    searchValue && handleSearch(searchValue)
  }

  return (
    <Input.Search
      allowClear
      value={inputValue}
      prefix={<SearchOutlined />}
      placeholder="Type your request here"
      enterButton="Search"
      onChange={onChange}
      onSearch={onSearch}
    />
  )
}

const SearchFormContainer: FunctionComponent<SearchFormContainerProps> = ({
  searchSentence,
  currentPage,
  fetchFilmsData,
  updateSearchSentence,
  updatePageCount,
  cleanFilms,
}) => {
  useEffect(() => {
    cleanFilms()
    updatePageCount(FIRST_PAGE_NUMBER)
    fetchFilmsData(searchSentence, currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSentence])

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (searchValue && searchValue !== searchSentence) {
        updateSearchSentence(searchValue)
      }
    },
    [searchSentence, updateSearchSentence],
  )

  return <SearchForm handleSearch={handleSearch} />
}

const mapStateToProps = (state: {
  searchSentence: string
  currentPage: number
}) => state

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilmsData: (searchValue: string, page: number) =>
      fetchFilms(getResource(searchValue, page), dispatch),
    updateSearchSentence: (searchSentence: string) =>
      dispatch(updateSearchSentence(searchSentence)),
    updatePageCount: (newPageCount: number) =>
      dispatch(updatePageCount(newPageCount)),
    cleanFilms: () => dispatch(cleanFilms()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
