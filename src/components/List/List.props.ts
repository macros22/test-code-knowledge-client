import { IQuestion } from 'interfaces/questions.interface';
import { ISnippet } from 'interfaces/snippets.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    itemsName: 'snippets' | 'questions',
    items: IQuestion[] | ISnippet[];
    category: string;
}