import { QuestionCard } from "components";

export interface Answer {
    answer: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    category: string;
    question: string;
    codeExample: string;
    answers: Answer[];
}

export interface IQuestionDto extends Omit<Question, 'id' | 'category'> {
    category: string;
}

