import axios from 'axios';
import { QUESTIONS_BASE_URL } from 'constants/urls';
import { Question } from 'interfaces/questions.interface';
import { Role } from 'interfaces/user.interface';

export const questionsApi = (userRole: Role) => {


    return {
        getWords: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                return res.data as Question[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        getQuestionsCount: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });
                return res.data as Record<string, number>;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        postWord: async (question: Question) => {
            try {

                // if (userRole == Role.ADMIN) {
                const url = QUESTIONS_BASE_URL;
                const res = await axios.post(
                    url,
                    question,
                    { withCredentials: true }
                );
                return res.data as Question[];
                // }

            } catch (error) {
                console.log(error);
            }

            return null;
        },
        patchWord: async (question: Question, questionId: string) => {
            try {
                const url = QUESTIONS_BASE_URL;
                const res = await axios.patch(
                    url + `/${questionId}`,
                    question,
                    { withCredentials: true }
                );
                return res.data as Question;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        deleteWord: async (questionId: string) => {
            try {

                const url = QUESTIONS_BASE_URL;

                const res = await axios.delete(
                    url + `/${questionId}`,
                    { withCredentials: true }
                );
                return res.data as Question;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
    }
}

