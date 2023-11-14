import useSWRInfinite from 'swr/infinite'
import { useSnippetsApi } from './useSnippetsApi'
import { useSnippetsInfo } from './useSnippetssInfo'
import { getSnippetsUrl } from '@/lib/helpers/get-snippets-url'
import { ITEMS_PER_PAGE } from '@/lib/constants/items-per-page'
import { ISnippet } from '@/lib/interfaces/snippets.interface'
import useSWRMutation from 'swr/mutation'
import { snippetsApi } from '@/lib/api/snippets.api'
import { useSWRConfig } from 'swr'
import { SNIPPETS_BASE_URL } from '@/lib/constants/urls'

interface IUseSnippetsProps {
  skip?: number
  limit?: number
  category?: string
  id?: string
}

export const useSnippets = ({
  skip,
  limit,
  category,
  id,
}: IUseSnippetsProps) => {
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
    isLoading: isLoadingSnippets,
  } = useSWRInfinite(getKey, api.getSnippets, { revalidateAll: true })

  let snippets: ISnippet[] = []

  if (data) {
    data.map((item) => {
      if (Array.isArray(item)) {
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
    (size > 0 && data && data[size - 1] === undefined)

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

  const pathcUrl = `${SNIPPETS_BASE_URL}/${id}`
  const postUrl = `${SNIPPETS_BASE_URL}`
  const { mutate } = useSWRConfig()

  const {
    trigger: triggerPatchSnippet,
    isMutating: isPatchSnippetLoading,
    error: patchSnippetError,
  } = useSWRMutation(pathcUrl, snippetsApi().patchSnippet)

  const patchSnippet = (snippetPayload) => {
    triggerPatchSnippet(snippetPayload)
    mutate(getKey, snippetPayload)
  }

  const {
    trigger: triggerPostSnippet,
    isMutating: isPostSnippetLoading,
    error: postSnippetError,
  } = useSWRMutation(postUrl, snippetsApi().postSnippet)

  const postSnippet = (snippetPayload) => {
    triggerPostSnippet(snippetPayload)
    mutate(getKey, snippetPayload)
  }

  return {
    patchSnippet,
    postSnippet,
    isLoadingSnippets: isLoadingInitialSnippets,
    isPatchSnippetLoading,
    isPostSnippetLoading,
    // isLoadingSnippets,
    patchSnippetError,
    isReachingEnd,
    snippets,
    setSize,
    size,
    isLoadingMore,
    mutateSnippets,
    getKey,
  }
}
