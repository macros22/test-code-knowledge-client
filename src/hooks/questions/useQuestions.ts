import { getQuestionsUrl } from "helpers/get-questions-url";
import { Category } from "interfaces/questions.interface";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";

interface useQuestionsProps {
    skip?: number;
    limit?: number;
    category?: Category;
}

export const useQuestions = ({ skip, limit, category = Category.JAVASCRIPT }: useQuestionsProps) => {

    const questionsUrl = getQuestionsUrl({
        category,
        skip,
        limit,
    });

    const { api } = useQuestionsApi();
    const { data: questions, mutate: mutateQuestions, error } = useSWR(questionsUrl, api.getWords);
    const isLoadingQuestions: boolean = !questions && !error;

    return {
        isLoadingQuestions,
        questions: questions ? questions : [],
        mutateQuestions,
    };
}

