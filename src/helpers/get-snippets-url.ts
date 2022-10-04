import { SNIPPETS_BASE_URL } from "constants/urls";

interface ISnippetsProps {
    category: string;
    skip: number | undefined;
    limit: number | undefined;
}

export const getSnippetsUrl = ({ category, skip, limit }: ISnippetsProps) => {
    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    return SNIPPETS_BASE_URL + '/' + category + searchParams;
}
