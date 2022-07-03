import { Question } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface QuestionCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    question: Question;
    handleEditButton: () => void;
    updateQuestions: () => void;
    withEdit?: boolean;
}