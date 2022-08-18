import { QUESTIONS_BASE_URL } from "constants/urls";
import { Category } from "interfaces/questions.interface";

interface IProps {
    category: Category;
    skip: number | undefined;
    limit: number | undefined;
}

export const getQuestionsUrl = ({ category, skip, limit }: IProps) => {

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    // return QUESTIONS_BASE_URL + '/' + category.toLowerCase() + searchParams;
    return QUESTIONS_BASE_URL + '/' + category.toLowerCase();
}