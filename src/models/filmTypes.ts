import { ReactNode } from 'react'

export interface IFilmItem {
  id: string
  href: string
  title: string
  imageSrc: string
  description: string
  content?: string | ReactNode
}

export interface IFilmsData {
  isValidSearchValue: boolean
  totalResults?: number
  items?: IFilmItem[]
}
