import useSWRInfinite from 'swr/infinite';
import { getQuestionsUrl } from "libs/helpers/get-questions-url";
import { IQuestion } from "libs/interfaces/questions.interface";
import { useQuestionsApi } from "./useQuestionsApi";
import { useQuestionsInfo } from "./useQuestionsInfo";

interface IUseQuestionsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useQuestions = ({ skip, limit, category }: IUseQuestionsProps) => {

    const { questionsInfo } = useQuestionsInfo();

    const getKey = (skip, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        const questionsUrl = getQuestionsUrl({
            categoryURLName: category ? questionsInfo[category]?.categoryURLName : '',
            skip,
            limit,
        });
        return questionsUrl;
    }

    const { api } = useQuestionsApi();
    // const { data: questions, mutate: mutateQuestions, error } = useSWR(questionsUrl, api.getQuestions);
    const { data, mutate: mutateQuestions, error, size, setSize } = useSWRInfinite(getKey, api.getQuestions)

    let questions: IQuestion[] = [];

    if (data) {
        data.map((item) => {
            if (item) {
                item.map(question => {
                    if (question) {
                        questions.push(question);
                    }
                })
            }
        })
    }

    const isLoadingQuestions: boolean = !data && !error;

    return {
        isLoadingQuestions,
        questions,
        mutateQuestions,
        setSize,
    };
}



