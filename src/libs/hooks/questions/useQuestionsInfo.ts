import useSWR from "swr";
import { QUESTIONS_BASE_URL } from "libs/constants/urls";
import { useQuestionsApi } from "./useQuestionsApi";

export const useQuestionsInfo = () => {

    const { api } = useQuestionsApi();

    const url = QUESTIONS_BASE_URL;
    const { data: questionsInfo, mutate: mutateCounts, error } = useSWR(url, api.getQuestionsInfo);
    const isLoadingQuestionsInfo = !questionsInfo && !error;

    return {
        isLoadingQuestionsInfo,
        questionsInfo: questionsInfo || {},
        mutateCounts,
    };
}

