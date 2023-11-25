import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface AuthFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  authMode: 'sign-in' | 'sign-up'
}
