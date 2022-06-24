import axios from "axios";
import { GET_QUESTIONS_URL, PATCH_QUESTION_URL, POST_QUESTION_URL } from "constants/urls";
import { Question } from "interfaces/questions.interface";

export const getQuestions = async (): Promise<Question[] | null > => {

    const response = await axios.get(GET_QUESTIONS_URL);

    return response.data;
}

export const  postQuestion = async (question: Omit<Question, "id">) => {

    const response = await axios.post(POST_QUESTION_URL, question);

    // console.log(response);
    // return response.data;
}

export const patchQuestion = async (questionPayload: Omit<Question, "id">, id:string) => {
    const response = await axios.patch(PATCH_QUESTION_URL + id, questionPayload);
};