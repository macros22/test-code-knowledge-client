// const { questionsInfo } = useQuestionsInfo();

import { useQuestionsInfo } from 'libs/hooks';
import { ItemsName } from 'libs/interfaces/common.interface';
import { useSnippetsInfo } from './snippets/useSnippetssInfo';

export const useItemsInfo = (itemsName: ItemsName) => {
  const { questionsInfo } = useQuestionsInfo();
  const { snippetsInfo } = useSnippetsInfo();

  return {
    itemsInfo: itemsName == 'questions' ? questionsInfo : snippetsInfo
  };
};
