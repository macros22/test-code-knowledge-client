import { ISnippet } from '@/lib/interfaces/snippets.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SnippetFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  snippetItem: ISnippet
  mode: 'add' | 'edit'
}
