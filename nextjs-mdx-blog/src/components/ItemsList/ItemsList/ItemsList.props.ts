import { IQuestion } from '@/lib/interfaces/questions.interface';
import { ISnippet } from '@/lib/interfaces/snippets.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IItemsListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  itemsName: 'snippets' | 'questions';
  items: IQuestion[] | ISnippet[];
  category: string;
}
