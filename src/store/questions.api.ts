import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question } from 'interfaces/questions.interface';

const baseUrl = 'https://code-knowledge-test-server.herokuapp.com/';

type patchType = Omit<Question, 'id'>;

export const questionsApi = createApi({
	reducerPath: 'questionsApi',
	tagTypes: ['Questions'],
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (build) => ({
		getQuestions: build.query({
			query: (limit = '') =>
				`javascriptQuestions?${limit && `_limit=${limit}`}`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Questions', id })),
							{ type: 'Questions', id: 'LIST' },
					  ]
					: [{ type: 'Questions', id: 'LIST' }],
		}),
		getQuestionsListsSize: build.query({
			query: () => `api/questions/sizes`,
			providesTags: ['Questions'],
		}),
		addQuestion: build.mutation({
			query: (body: Omit<Question, 'id'>) => ({
				url: 'javascriptQuestions',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
		}),
		editQuestion: build.mutation({
			query: ({ id, body }) => ({
				url: `javascriptQuestions/${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
		}),
		deleteQuestion: build.mutation({
			query: (id: number) => ({
				url: `javascriptQuestions/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useGetQuestionsListsSizeQuery,
	useAddQuestionMutation,
	useDeleteQuestionMutation,
	useEditQuestionMutation,
} = questionsApi;
