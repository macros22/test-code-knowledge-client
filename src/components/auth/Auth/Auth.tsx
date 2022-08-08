import { Container, Card } from "react-bootstrap";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import { IAuthProps } from "./Auth.props";

export const Auth = ({ authMode }: IAuthProps): JSX.Element => {
    return (
        <>
            <Container style={{ width: '700px' }}>
                <div className='mb-3' style={{ textAlign: 'center' }}>
                    {authMode == 'sign-in' ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
                </div>
                <Card >
                    <Card.Body>
                        {authMode == 'sign-in' ? <SignIn /> : <SignUp />}
                    </Card.Body>
                </Card>
            </Container>
        </>);
};