import { ReactNode } from 'react'

export interface IFilmItem {
  id: string
  href: string
  title: string
  description: string
  imageSrc: string
  isBookmarked?: boolean
  content?: string | ReactNode
}

export interface IFilmsData {
  isValidSearchValue: boolean
  totalResults?: number
  items?: IFilmItem[]
}
