import { IQuestion } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IQuestionCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    question: IQuestion;
    handleEditButton: () => void;
    withEdit?: boolean;
    index: number;
}