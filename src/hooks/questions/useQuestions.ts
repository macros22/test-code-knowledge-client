import { QUESTIONS_BASE_URL } from "constants/urls";
import { Category } from "interfaces/questions.interface";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";

interface useQuestionsProps {
    skip?: number;
    limit?: number;
    category?: Category;
}

export const useQuestions = ({ skip, limit, category = Category.JavaScript }: useQuestionsProps) => {

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const { api } = useQuestionsApi();

    const questionsUrl = QUESTIONS_BASE_URL + '/' + category.toLowerCase() + searchParams;
    const { data: questions, mutate: mutateQuestions, error } = useSWR(questionsUrl, api.getWords);
    const isLoadingQuestions: boolean = !questions && !error;

    return {
        isLoadingQuestions,
        questions: questions ? questions : [],
        mutateQuestions,
    };
}

