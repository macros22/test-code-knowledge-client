import { IAnswer } from "interfaces/questions.interface";

export interface AnswersListProps {
    answers: IAnswer[];
    setCheckedAnswers: React.Dispatch<React.SetStateAction<boolean[][]>>;
    currentQuestion: number;
    checkedAnswers: boolean[][];
}