import { IAnswer, IQuestion } from "libs/interfaces/questions.interface";

export interface IAnswersListResultProps {
	answers: IAnswer[];
	currentQuestion: number;
	checkedAnswers: boolean[][];
}

export interface ITestResultProps {
	questions: IQuestion[];
}