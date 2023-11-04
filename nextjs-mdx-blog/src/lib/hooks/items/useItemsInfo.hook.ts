// const { questionsInfo } = useQuestionsInfo();

import { ItemsName } from '@/lib/interfaces/common.interface'
import { useSnippetsInfo } from './snippets/useSnippetssInfo'
import { useQuestionsInfo } from '..'

export const useItemsInfo = (itemsName: ItemsName) => {
  const { questionsInfo } = useQuestionsInfo()
  const { snippetsInfo } = useSnippetsInfo()

  return {
    itemsInfo: itemsName == 'questions' ? questionsInfo : snippetsInfo,
  }
}
