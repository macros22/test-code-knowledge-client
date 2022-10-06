import { getQuestionsUrl } from "helpers/get-questions-url";
import useSWR from "swr";
import { useQuestionsApi } from "./useQuestionsApi";
import { useQuestionsInfo } from "./useQuestionsInfo";

interface IUseQuestionsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useQuestions = ({ skip, limit, category}: IUseQuestionsProps) => {

    const { questionsInfo } = useQuestionsInfo();

    const questionsUrl = getQuestionsUrl({
        categoryURLName: category ? questionsInfo[category]?.categoryURLName : '',
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

