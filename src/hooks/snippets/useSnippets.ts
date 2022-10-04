import { getQuestionsUrl } from "helpers/get-questions-url";
import { getSnippetsUrl } from "helpers/get-snippets-url";
import useSWR from "swr";
import { useSnippetsApi } from "./useSnippetsApi";

interface IUseSnippetsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useSnippets = ({ skip, limit, category = 'JavaScript' }: IUseSnippetsProps) => {

    const snippetsUrl = getSnippetsUrl({
        category,
        skip,
        limit,
    });

    const { api } = useSnippetsApi();
    const { data: snippets, mutate: mutateSnippets, error } = useSWR(snippetsUrl, api.getSnippets);
    const isLoadingSnippets: boolean = !snippets && !error;

    return {
        isLoadingSnippets,
        snippets: snippets || [],
        mutateSnippets,
    };
}

