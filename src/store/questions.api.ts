import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question } from 'interfaces/questions.interface';

const baseUrl = 'https://code-knowledge-prod-nodejs-express-ts-gsiguz.mo2.mogenius.io/api/questions/';
// const baseUrl = 'http://localhost:3010/api/questions';

type patchType = Omit<Question, 'id'>;

export const questionsApi = createApi({
	reducerPath: 'questionsApi',
	tagTypes: ['Questions'],
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (build) => ({
		getQuestions: build.query({
			query: ({category = 'javascript', limit = 0, skip = 0}) =>
				// `${category}${limit && `?limit=${limit}`}${skip && `?skip=${skip}`}`,
				`${category}`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Questions', id })),
							{ type: 'Questions', id: 'LIST' },
					  ]
					: [{ type: 'Questions', id: 'LIST' }],
		}),
		getQuestionsListsSize: build.query({
			query: () => ``,
			providesTags: ['Questions'],
		}),
		addQuestion: build.mutation({
			query: (body: Omit<Question, 'id'>) => ({
				url: 'create',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
		}),
		editQuestion: build.mutation({
			query: ({ id, body }) => ({
				url: `${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
		}),
		deleteQuestion: build.mutation({
			query: (id: string) => ({
				url: `${id}`,
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
