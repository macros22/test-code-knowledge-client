import axios from 'axios';
import { SNIPPETS_BASE_URL } from 'constants/urls';
import { ISnippetDto, ISnippet } from 'interfaces/snippets.interface';
import { Role } from 'interfaces/user.interface';

export const snippetsApi = (userRole?: Role) => {

    return {
        getSnippets: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                return res.data as ISnippet[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        getSnippetsInfo: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });
                return res.data as Record<string, { amount: number, categoryURLName: string }>;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        postSnippet: async (snippet: ISnippetDto) => {
            try {

                // if (userRole == Role.ADMIN) {
                const url = SNIPPETS_BASE_URL;
                const res = await axios.post(
                    url,
                    snippet,
                    { withCredentials: true }
                );
                return res.data as ISnippet[];
                // }

            } catch (error) {
                console.log(error);
            }

            return null;
        },
        patchSnippet: async (snippet: ISnippetDto, snippetId: string) => {
            try {
                const url = SNIPPETS_BASE_URL;
                const res = await axios.patch(
                    url + `/${snippetId}`,
                    snippet,
                    { withCredentials: true }
                );
                return res.data as ISnippet;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        deleteSnippet: async (snippetId: string) => {
            try {
                const url = SNIPPETS_BASE_URL;
                const res = await axios.delete(
                    url + `/${snippetId}`,
                    { withCredentials: true }
                );
                return res.data as ISnippet;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
    }
}

