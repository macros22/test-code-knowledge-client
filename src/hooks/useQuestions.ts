// import { WORDS_MODE } from "constants/names.storage";
// import { USER_WORDS_URL, COMMON_WORDS_URL, COMMON_WORDS_COUNT_URL, USER_WORDS_COUNT_URL } from "constants/url";
// import { useLocalStorage, useWordsApi } from "hooks";
import { QUESTIONS_BASE_URL } from "constants/urls";
import { Category } from "interfaces/questions.interface";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";
// import { Role, WordMode } from "types/types";


export const useQuestions = (skip?: number, limit?: number) => {

    // const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'userWords');
    const category: Category = Category.JavaScript;

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const { api } = useQuestionsApi();

    const questionsUrl = QUESTIONS_BASE_URL + '/' + category + searchParams;
    const { data: questions, mutate, error } = useSWR(questionsUrl, api.getWords);
    const loading: boolean = !questions && !error;

    const countUrl = QUESTIONS_BASE_URL;
    const { data: counts, mutate: mutateCount, error: countError } = useSWR(countUrl, api.getQuestionsCount);
    const loadingCount = !counts && !countError;

    return {
        loading,
        questions: questions ? questions : [],
        mutate,
        loadingCount,
        counts: counts ? counts : {},
        mutateCount,
    };
}

