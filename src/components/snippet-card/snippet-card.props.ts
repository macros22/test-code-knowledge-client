import { ISnippet } from '@/lib/interfaces/snippets.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SnippetCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  snippet: ISnippet
  handleEditButton: () => void
  index: number
  withEdit?: boolean
}
