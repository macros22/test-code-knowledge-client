import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { IAuthProps } from './Auth.props';
import dynamic from 'next/dynamic';
const SignIn = dynamic(() => import('../SignIn/SignIn'));
const SignUp = dynamic(() => import('../SignUp/SignUp'));

export const Auth = ({ authMode }: IAuthProps): JSX.Element => {
  return (
    <Container>
      <div className="mb-3" style={{ textAlign: 'center' }}>
        {authMode == 'sign-in' ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
      </div>
      <Card>
        <Card.Body>{authMode == 'sign-in' ? <SignIn /> : <SignUp />}</Card.Body>
      </Card>
    </Container>
  );
};
