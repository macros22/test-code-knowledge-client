import { getQuestionsUrl } from "helpers/get-questions-url";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";

interface useQuestionsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useQuestions = ({ skip, limit, category = 'javascript' }: useQuestionsProps) => {

    const questionsUrl = getQuestionsUrl({
        category,
        skip,
        limit,
    });

    const { api } = useQuestionsApi();
    const { data: questions, mutate: mutateQuestions, error } = useSWR(questionsUrl, api.getQuestions);
    const isLoadingQuestions: boolean = !questions && !error;

    return {
        isLoadingQuestions,
        questions: questions ? questions : [],
        mutateQuestions,
    };
}

