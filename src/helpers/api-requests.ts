import axios from "axios";
import { QUESTIONS_URL } from "constants/urls";
import { Question } from "interfaces/questions.interface";

export const getQuestions = async (): Promise<Question[] | null> => {
  const response = await axios.get(QUESTIONS_URL);

  return response.data;
};

export const postQuestion = async (question: Omit<Question, "id">) => {
  const response = await axios.post(QUESTIONS_URL, question);

  // console.log(response);
  // return response.data;
};

export const patchQuestion = async (
  questionPayload: Omit<Question, "id">,
  id: string
) => {
  const response = await axios.patch(QUESTIONS_URL + "/" + id, questionPayload);
};

export const deleteQuestion = async (id: string) => {
  const response = await axios.delete(QUESTIONS_URL + "/" + id);
};
