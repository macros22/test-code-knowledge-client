import { FC } from 'react'
import dynamic from 'next/dynamic'
import { AuthFormProps } from './auth-form.props'
import { Card, CardContent } from '../ui/card'

const SignIn = dynamic(() => import('./sign-in-form/sign-in-form'))
const SignUp = dynamic(() => import('./sign-up-form/sign-up-form'))

export const AuthForm: FC<AuthFormProps> = ({ authMode }) => {
  const isSignIn = authMode === 'sign-in'

  return (
    <>
      <div className="mb-3 text-center">
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      </div>
      <Card className="p-2">
        <CardContent>{isSignIn ? <SignIn /> : <SignUp />}</CardContent>
      </Card>
    </>
  )
}
