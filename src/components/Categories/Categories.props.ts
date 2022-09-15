import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CategoriesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    questionsInfo: Record<string, number>;
}