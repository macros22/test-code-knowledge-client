export interface Answer {
    answer: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    question: string;
    codeExample: string;
    answersList: Answer[];
}