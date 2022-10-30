import useSWRInfinite from 'swr/infinite';
import { getQuestionsUrl } from "libs/helpers/get-questions-url";
import { IQuestion } from "libs/interfaces/questions.interface";
import { useQuestionsApi } from "./useQuestionsApi";
import { useQuestionsInfo } from "./useQuestionsInfo";
import { ITEMS_PER_PAGE } from 'libs/constants/items-per-page';

interface IUseQuestionsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useQuestions = ({ skip, limit, category }: IUseQuestionsProps) => {

    const { questionsInfo } = useQuestionsInfo();

    // SWR default function name for pagination.
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        const questionsUrl = getQuestionsUrl({
            categoryURLName: category ? questionsInfo[category]?.categoryURLName : '',
            skip: pageIndex * (limit || ITEMS_PER_PAGE),
            limit,
        });
        return questionsUrl;
    }

    const { api } = useQuestionsApi();
    const { data, error, size, setSize, isValidating, mutate: mutateQuestions } = useSWRInfinite(getKey, api.getQuestions)

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

    const isLoadingInitialQuestions: boolean = !data && !error;
    const isLoadingMore =
        isLoadingInitialQuestions ||
        (size > 0 && data && typeof data[size - 1] === "undefined");

    const isEmpty = data?.[0]?.length === 0;

    let isReachingEnd = isEmpty;

    if (data) {
        const len = data.length;
        const items = data[len - 1];
        if (Array.isArray(items)) {
            isReachingEnd = isEmpty || (items.length < ITEMS_PER_PAGE);
        }
    }

    const isRefreshing = isValidating && data && data.length === size;

    return {
        isLoadingQuestions: isLoadingInitialQuestions,
        isReachingEnd,
        questions,
        setSize,
        size,
        isLoadingMore,
        mutateQuestions,
    };
}



