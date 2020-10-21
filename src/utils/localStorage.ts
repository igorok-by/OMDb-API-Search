import { IFilmItem } from '../models'

const bookmarked: string = 'bookmarkedFilms'

export const loadBookmarksFromLocal = (): IFilmItem[] | undefined => {
  try {
    const serializedBookmarks = localStorage.getItem(bookmarked)
    if (serializedBookmarks === null) return undefined
    return JSON.parse(serializedBookmarks)[bookmarked]
  } catch (err) {
    return undefined
  }
}

export const saveBookmarksToLocal = (bookmarkedFilms: {
  bookmarkedFilms: IFilmItem[]
}): void => {
  try {
    const serializedBookmarks = JSON.stringify(bookmarkedFilms)
    localStorage.setItem(bookmarked, serializedBookmarks)
  } catch (err) {
    // Ignore :)
  }
}
