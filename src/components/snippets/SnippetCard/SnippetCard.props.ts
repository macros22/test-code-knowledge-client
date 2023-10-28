import { ISnippet } from 'libs/interfaces/snippets.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ISnippetCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  snippet: ISnippet;
  handleEditButton: () => void;
  withEdit?: boolean;
  index: number;
}
