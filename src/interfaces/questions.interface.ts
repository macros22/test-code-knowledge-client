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
}

export interface IQuestionDto extends Omit<IQuestion, 'id'> { }

