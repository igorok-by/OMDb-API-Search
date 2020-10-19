import { IDataApi, IDataApiItem, IFilmItem, IFilmsData } from '../models'
import { OMDB_API_KEY, BASE_URL } from './constants'

const createRequestUrl = (searchValue: string, currentPage: number = 1) => {
  const searchSentence = searchValue.trim().replace(/\s+/gi, '%20')

  const urlParams = {
    s: searchSentence,
    page: currentPage,
    apikey: OMDB_API_KEY,
  }

  const url = Object.entries(urlParams).reduce(
    (acc, item) => `${acc}&${item[0]}=${item[1]}`,
    BASE_URL,
  )

  return url
}

const getPage = (data: IDataApi): IFilmsData => {
  if (data.Response === 'False') {
    return {
      isValidSearchValue: false,
    }
  }

  return {
    isValidSearchValue: true,
    totalResults: Number(data.totalResults),
    items: data.Search.map(
      (item: IDataApiItem, idx: number): IFilmItem => ({
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
  currentPage: number,
): Promise<IFilmsData> => {
  const res = await fetch(createRequestUrl(searchValue, currentPage))

  if (!res.ok) {
    throw new Error(`Could not fetch ${searchValue}, received ${res.status}`)
  }

  const data = await res.json()

  return getPage(data)
}
