import { ReactNode } from 'react'

export interface IListItem {
  id: string
  href: string
  title: string
  imageSrc: string
  description: string
  content?: string | ReactNode
}

export interface IListData {
  isValidSearchValue: boolean
  totalResults?: string
  items?: IListItem[]
}
