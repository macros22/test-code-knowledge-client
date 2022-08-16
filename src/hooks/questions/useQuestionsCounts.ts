import { QUESTIONS_BASE_URL } from "constants/urls";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";

export const useQuestionsCounts = () => {

    const { api } = useQuestionsApi();

    const countUrl = QUESTIONS_BASE_URL;
    const { data: counts, mutate: mutateCounts, error: countError } = useSWR(countUrl, api.getQuestionsCount);
    const isLoadingCount = !counts && !countError;

    return {
        isLoadingCount,
        counts: counts ? counts : {},
        mutateCounts,
    };
}

