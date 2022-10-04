import { getQuestionsUrl } from "helpers/get-questions-url";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";

interface IUseQuestionsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useQuestions = ({ skip, limit, category = 'JavaScript' }: IUseQuestionsProps) => {

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

