import { Answer } from "interfaces/questions.interface";

export interface AnswersListProps {
    answers: Answer[];
    setCheckedAnswers: React.Dispatch<React.SetStateAction<boolean[][]>>;
    currentQuestion: number;
    checkedAnswers: boolean[][];
}