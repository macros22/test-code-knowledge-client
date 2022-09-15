import { Question } from "interfaces/questions.interface";

export const questionExample: Question = {
    id: '12345',
    category: 'javascript',
    question: 'What will be output to the console?',
    codeExample: `const example = () => {
    return ExampleCode;
}`,
    answers: [
        { answer: 'first', isCorrect: true },
        { answer: 'second', isCorrect: false },
        { answer: 'third', isCorrect: false },
        { answer: 'fourth', isCorrect: false },
    ],
};