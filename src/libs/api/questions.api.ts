import axios from 'axios';
import { QUESTIONS_BASE_URL } from 'libs/constants/urls';
import { IItemsInfo } from 'libs/interfaces/common.interface';
import { IQuestionDto, IQuestion } from 'libs/interfaces/questions.interface';
import { Role } from 'libs/interfaces/user.interface';

export const questionsApi = (userRole?: Role) => {
    return {
        getQuestions: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                return res.data as IQuestion[];
            } catch (error) {
                console.log('getQuestions error: ', error);
            }

            return null;
        },
        getQuestionsInfo: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });
                return res.data as IItemsInfo;
            } catch (error) {
                console.log('getQuestionsInfo error:', error);
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

