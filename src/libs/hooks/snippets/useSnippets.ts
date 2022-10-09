import useSWR from "swr";
import { getSnippetsUrl } from "libs/helpers/get-snippets-url";
import { useSnippetsApi } from "./useSnippetsApi";
import { useSnippetsInfo } from "./useSnippetssInfo";

interface IUseSnippetsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useSnippets = ({ skip, limit, category }: IUseSnippetsProps) => {

    const { snippetsInfo } = useSnippetsInfo();

    const snippetsUrl = getSnippetsUrl({
        categoryURLName: category ? snippetsInfo[category]?.categoryURLName : '',
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

