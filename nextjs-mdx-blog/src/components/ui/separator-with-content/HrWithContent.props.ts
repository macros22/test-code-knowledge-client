import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface HrWithContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
