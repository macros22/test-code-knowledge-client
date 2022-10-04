import { IQuestion } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IQuestionsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    questions: IQuestion[];
    category: string;
}