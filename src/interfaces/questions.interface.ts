export interface Answer {
    answer: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    question: string;
    codeExample: string;
    answers: Answer[];
}