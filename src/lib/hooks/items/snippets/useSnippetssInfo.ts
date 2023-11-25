import useSWR from 'swr'

import { SNIPPETS_BASE_URL } from '@/lib/constants/urls'
import { snippetsApi } from '@/lib/api/snippets.api'

export const useSnippetsInfo = () => {
  const url = SNIPPETS_BASE_URL
  const {
    data: snippetsInfo,
    mutate: mutateCounts,
    error,
  } = useSWR(url, snippetsApi.getSnippetsInfo)
  const isLoadingSnippetsInfo = !snippetsInfo && !error

  return {
    isLoadingSnippetsInfo,
    snippetsInfo: snippetsInfo || {},
    mutateCounts,
  }
}
