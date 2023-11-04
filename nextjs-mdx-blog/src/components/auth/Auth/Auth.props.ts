import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IAuthProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  authMode: 'sign-in' | 'sign-up'
}
