import useSWRInfinite from 'swr/infinite'
import { useSnippetsApi } from './useSnippetsApi'
import { useSnippetsInfo } from './useSnippetssInfo'
import { getSnippetsUrl } from '@/lib/helpers/get-snippets-url'
import { ITEMS_PER_PAGE } from '@/lib/constants/items-per-page'
import { ISnippet } from '@/lib/interfaces/snippets.interface'

interface IUseSnippetsProps {
  skip?: number
  limit?: number
  category?: string
}

export const useSnippets = ({ skip, limit, category }: IUseSnippetsProps) => {
  const { snippetsInfo } = useSnippetsInfo()

  // SWR default function name for pagination.
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    const snippetsUrl = getSnippetsUrl({
      categoryURLName: category ? snippetsInfo[category]?.categoryURLName : '',
      skip: pageIndex * (limit || ITEMS_PER_PAGE),
      limit,
    })
    return snippetsUrl
  }

  const { api } = useSnippetsApi()
  const {
    data,
    error,
    size,
    setSize,
    isValidating,
    mutate: mutateSnippets,
  } = useSWRInfinite(getKey, api.getSnippets)

  let snippets: ISnippet[] = []

  if (data) {
    data.map((item) => {
      if (item) {
        item.map((snippet) => {
          if (snippet) {
            snippets.push(snippet)
          }
        })
      }
    })
  }

  const isLoadingInitialSnippets: boolean = !data && !error
  const isLoadingMore =
    isLoadingInitialSnippets ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isEmpty = data?.[0]?.length === 0

  let isReachingEnd = isEmpty

  if (data) {
    const len = data.length
    const items = data[len - 1]
    if (Array.isArray(items)) {
      isReachingEnd = isEmpty || items.length < ITEMS_PER_PAGE
    }
  }

  const isRefreshing = isValidating && data && data.length === size

  return {
    isLoadingSnippets: isLoadingInitialSnippets,
    isReachingEnd,
    snippets,
    setSize,
    size,
    isLoadingMore,
    mutateSnippets,
  }
}
