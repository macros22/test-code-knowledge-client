import { IInfoLink } from "./common.interface";

export interface IUserAnswer {
    answer: string;
    isChecked: boolean;
}

export interface IAnswer {
    answer: string;
    isCorrect: boolean;
}

export interface IQuestion {
    id: string;
    category: string;
    question: string;
    codeExample: string;
    answers: IAnswer[];
    tags: string[];
    infoLinks: IInfoLink[];
}

export interface IQuestionDto extends Omit<IQuestion, 'id'> { }

export interface IQuestionsPageProps extends Record<string, unknown> {
    category: string;
    skip: number;
    limit: number;
    fallback: Record<string, IQuestion[] | null>;
}