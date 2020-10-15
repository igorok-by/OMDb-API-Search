import { ReactNode } from 'react'

export interface IListItem {
  href: string
  title: string
  avatar: string
  description: string
  content: string | ReactNode
}
