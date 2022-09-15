import axios from 'axios';
import { QUESTIONS_BASE_URL } from 'constants/urls';
import { IQuestionDto, IQuestion } from 'interfaces/questions.interface';
import { Role } from 'interfaces/user.interface';

export const questionsApi = (userRole?: Role) => {


    return {
        getQuestions: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                return res.data as IQuestion[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        getQuestionsInfo: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });
                return res.data as Record<string, number>;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        postQuestion: async (question: IQuestionDto) => {
            try {

                // if (userRole == Role.ADMIN) {
                const url = QUESTIONS_BASE_URL;
                const res = await axios.post(
                    url,
                    question,
                    { withCredentials: true }
                );
                return res.data as IQuestion[];
                // }

            } catch (error) {
                console.log(error);
            }

            return null;
        },
        patchQuestion: async (question: IQuestionDto, questionId: string) => {
            try {
                const url = QUESTIONS_BASE_URL;
                const res = await axios.patch(
                    url + `/${questionId}`,
                    question,
                    { withCredentials: true }
                );
                return res.data as IQuestion;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        deleteQuestion: async (questionId: string) => {
            try {

                const url = QUESTIONS_BASE_URL;

                const res = await axios.delete(
                    url + `/${questionId}`,
                    { withCredentials: true }
                );
                return res.data as IQuestion;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
    }
}

