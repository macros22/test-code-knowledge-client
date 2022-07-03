import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface QuestionsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    withEdit?: boolean;
}