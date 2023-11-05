// const { questionsInfo } = useQuestionsInfo();

import { useQuestionsInfo } from 'libs/hooks';
import { ItemsMode } from 'libs/interfaces/common.interface';
import { useSnippetsInfo } from './snippets/useSnippetssInfo';

export const useItemsInfo = (itemsName: ItemsMode) => {
  const { questionsInfo } = useQuestionsInfo();
  const { snippetsInfo } = useSnippetsInfo();

  return {
    itemsInfo: itemsName === 'questions' ? questionsInfo : snippetsInfo
  };
};
