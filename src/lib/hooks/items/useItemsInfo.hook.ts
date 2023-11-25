// const { questionsInfo } = useQuestionsInfo();

import { ItemsMode } from '@/lib/interfaces/common.interface'
import { useSnippetsInfo } from './snippets/useSnippetssInfo'
import { useQuestionsInfo } from '..'

export const useItemsInfo = (itemsName: ItemsMode) => {
  const { questionsInfo } = useQuestionsInfo()
  const { snippetsInfo } = useSnippetsInfo()

  return {
    itemsInfo: itemsName == 'questions' ? questionsInfo : snippetsInfo,
  }
}
