import useSWR from 'swr'
import { useQuestionsApi } from './useQuestionsApi'
import { QUESTIONS_BASE_URL } from '@/lib/constants/urls'

export const useQuestionsInfo = () => {
  const { api } = useQuestionsApi()

  const url = QUESTIONS_BASE_URL
  const {
    data: questionsInfo,
    mutate: mutateCounts,
    error,
  } = useSWR(url, api.getQuestionsInfo)
  const isLoadingQuestionsInfo = !questionsInfo && !error

  return {
    isLoadingQuestionsInfo,
    questionsInfo: questionsInfo || {},
    mutateCounts,
  }
}
