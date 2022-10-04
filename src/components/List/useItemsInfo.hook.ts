// const { questionsInfo } = useQuestionsInfo();

import { useQuestionsInfo } from "hooks";
import { useSnippetsInfo } from "hooks/snippets/useSnippetssInfo";

export const useItemsInfo = (itemsName: 'snippets' | 'questions') => {
    const { questionsInfo } = useQuestionsInfo();
    const { snippetsInfo } = useSnippetsInfo();

    return {
        itemsInfo: itemsName == 'questions' ? questionsInfo : snippetsInfo
    }
}