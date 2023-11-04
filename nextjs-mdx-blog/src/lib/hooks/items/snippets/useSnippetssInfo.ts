import useSWR from 'swr'
import { useSnippetsApi } from './useSnippetsApi'
import { SNIPPETS_BASE_URL } from '@/lib/constants/urls'

export const useSnippetsInfo = () => {
  const { api } = useSnippetsApi()

  const url = SNIPPETS_BASE_URL
  const {
    data: snippetsInfo,
    mutate: mutateCounts,
    error,
  } = useSWR(url, api.getSnippetsInfo)
  const isLoadingSnippetsInfo = !snippetsInfo && !error

  return {
    isLoadingSnippetsInfo,
    snippetsInfo: snippetsInfo || {},
    mutateCounts,
  }
}
