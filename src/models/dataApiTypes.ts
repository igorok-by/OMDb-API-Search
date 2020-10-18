export interface IDataApiItem {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

export interface IDataApi {
  totalResults: string
  Response: string
  Search: IDataApiItem[]
}
