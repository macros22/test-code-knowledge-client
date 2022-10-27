import useSWRInfinite from 'swr/infinite';
import { getSnippetsUrl } from "libs/helpers/get-snippets-url";
import { useSnippetsApi } from "./useSnippetsApi";
import { useSnippetsInfo } from "./useSnippetssInfo";
import { ISnippet } from 'libs/interfaces/snippets.interface';

interface IUseSnippetsProps {
    skip?: number;
    limit?: number;
    category?: string;
}

export const useSnippets = ({ skip, limit, category }: IUseSnippetsProps) => {

    const { snippetsInfo } = useSnippetsInfo();



    const getKey = (skip, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        const snippetsUrl = getSnippetsUrl({
            categoryURLName: category ? snippetsInfo[category]?.categoryURLName : '',
            skip,
            limit,
        });
        return snippetsUrl;
    }


    const { api } = useSnippetsApi();
    const { data, mutate: mutateSnippets, error, size, setSize } = useSWRInfinite(getKey, api.getSnippets);

    let snippets: ISnippet[] = [];

    if (data) {
        data.map((item) => {
            if (item) {
                item.map(snippet => {
                    if (snippet) {
                        snippets.push(snippet);
                    }
                })
            }
        })
    }

    const isLoadingSnippets: boolean = !data && !error;


    return {
        isLoadingSnippets,
        snippets,
        mutateSnippets,
        setSize
    };
}

