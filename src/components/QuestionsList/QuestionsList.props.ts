import { Question } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface QuestionsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    questions: Question[];
}