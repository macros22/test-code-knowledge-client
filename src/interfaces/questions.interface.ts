export interface Answer {
    answer: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    category: Category;
    question: string;
    codeExample: string;
    answers: Answer[];
}

export enum Category {
    JavaScript = 'JavaScript',
    TypeScript = 'TypeScript',
    NodeJs = 'Node.js',
}