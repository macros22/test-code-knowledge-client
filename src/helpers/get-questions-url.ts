import { QUESTIONS_BASE_URL, RANDOM_QUESTIONS_BASE_URL } from "constants/urls";

interface IQuestionsProps {
    category: string;
    skip: number | undefined;
    limit: number | undefined;
}

export const getQuestionsUrl = ({ category, skip, limit }: IQuestionsProps) => {
    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    return QUESTIONS_BASE_URL + '/' + category.toLowerCase() + searchParams;
    // return QUESTIONS_BASE_URL + '/' + category.toLowerCase();
}


interface IRandomQuestionsProps {
    category: string;
    limit: number;
}

export const getRandomQuestionsUrl = ({ category, limit }: IRandomQuestionsProps) => {
    const searchParams = `?limit=${limit}`;
    return RANDOM_QUESTIONS_BASE_URL + '/' + category.toLowerCase() + searchParams;
}