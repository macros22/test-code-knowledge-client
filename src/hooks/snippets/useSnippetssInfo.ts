import useSWR from "swr";
import { SNIPPETS_BASE_URL } from "constants/urls";
import { useSnippetsApi } from "./useSnippetsApi";

export const useSnippetsInfo = () => {

    const { api } = useSnippetsApi();

    const url = SNIPPETS_BASE_URL;
    const { data: snippetsInfo, mutate: mutateCounts, error } = useSWR(url, api.getSnippetsInfo);
    const isLoadingSnippetsInfo = !snippetsInfo && !error;

    return {
        isLoadingSnippetsInfo,
        snippetsInfo: snippetsInfo || {},
        mutateCounts,
    };
}

