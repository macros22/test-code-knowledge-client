import { ISnippet } from '@/lib/interfaces/snippets.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ISnippetFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  snippetItem: ISnippet;
  mode: 'add' | 'edit';
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
