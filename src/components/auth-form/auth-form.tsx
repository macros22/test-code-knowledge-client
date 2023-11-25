import { FC } from 'react'
import { Container, Card } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import { AuthFormProps } from './auth-form.props'

const SignIn = dynamic(() => import('./sign-in-form/sign-in-form'))
const SignUp = dynamic(() => import('./sign-up-form/sign-up-form'))

export const AuthForm: FC<AuthFormProps> = ({ authMode }) => {
  const isSignIn = authMode === 'sign-in';

  return (
    <Container>
      <div className="mb-3" style={{ textAlign: 'center' }}>
        {isSignIn ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
      </div>
      <Card>
        <Card.Body>{isSignIn ? <SignIn /> : <SignUp />}</Card.Body>
      </Card>
    </Container>
  )
}
