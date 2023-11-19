import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface AuthCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  authMode: 'sign-in' | 'sign-up'
}
