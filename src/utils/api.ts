import { IDataApi, IDataApiItem, IListItem, IListData } from '../models'
import { OMDB_API_KEY, BASE_URL } from './constants'

const createRequestUrl = (searchValue: string, pageCount: number = 1) => {
  const urlParams = {
    s: searchValue,
    page: pageCount,
    apikey: OMDB_API_KEY,
  }

  const url = Object.entries(urlParams).reduce(
    (acc, item) => `${acc}&${item[0]}=${item[1]}`,
    BASE_URL,
  )

  return url
}

const getPage = (data: IDataApi) => {
  if (data.Response === 'False') {
    return {
      isValidSearchValue: false,
    }
  }

  return {
    isValidSearchValue: true,
    totalResults: data.totalResults,
    items: data.Search.map(
      (item: IDataApiItem, idx: number): IListItem => ({
        id: `${item.imdbID}${idx}`,
        href: `https://www.imdb.com/title/${item.imdbID}/`,
        title: item.Title,
        description: item.Year,
        imageSrc: item.Poster,
      }),
    ),
  }
}

export const getResource = async (
  searchValue: string,
  pageCount: number,
): Promise<IListData> => {
  const res = await fetch(createRequestUrl(searchValue, pageCount))

  if (!res.ok) {
    throw new Error(`Could not fetch ${searchValue}, received ${res.status}`)
  }

  const data = await res.json()

  return getPage(data)
}
