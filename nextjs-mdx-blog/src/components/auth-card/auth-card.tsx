import { FC } from 'react'
import { Container, Card } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import { AuthCardProps } from './auth-card.props'
const SignIn = dynamic(() => import('./sign-in/sign-in'))
const SignUp = dynamic(() => import('./sign-up/sign-up'))

export const AuthCard:FC<AuthCardProps> = ({ authMode }) => {
  return (
    <Container>
      <div className="mb-3" style={{ textAlign: 'center' }}>
        {authMode == 'sign-in' ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
      </div>
      <Card>
        <Card.Body>{authMode == 'sign-in' ? <SignIn /> : <SignUp />}</Card.Body>
      </Card>
    </Container>
  )
}
