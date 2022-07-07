import { Question } from 'interfaces/questions.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface TechnologyListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    questionsListsSizes: Record<string, number>;
}