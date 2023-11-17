import { questionsApi } from '@/lib/api/questions.api'

export const useQuestionsApi = () => {

  return {
    api: questionsApi,
  }
}
