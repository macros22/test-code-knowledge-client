import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authApi } from 'libs/api/auth.api';
import { Alert, Button, FloatingLabel, Form, InputGroup, Spinner } from 'react-bootstrap';
import { BsFillLockFill, BsFillPersonFill, BsFillEnvelopeFill } from "react-icons/bs";

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && name && password) {
      setIsSubmitLoading(true);
      setErrorMsg('');
      
      const { user, errorMessage } = await authApi.signUp({ email, name, password });
      if (errorMessage) {
        setErrorMsg(errorMessage);
      }
      if (user) {
        router.replace('/auth/sign-in')
      }
      setIsSubmitLoading(false);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleName = (event) => {
    setName(event.currentTarget.value);
  };

  const handlePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text >
            <BsFillEnvelopeFill />
          </InputGroup.Text>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
          >
            <Form.Control value={email} onChange={handleEmail} type="email" placeholder="Enter email" />
          </FloatingLabel>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text >
            <BsFillPersonFill />
          </InputGroup.Text>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
          >
            <Form.Control value={name} onChange={handleName} placeholder="Enter your name" />
          </FloatingLabel>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text  >
            <BsFillLockFill />
          </InputGroup.Text>
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
          >
            <Form.Control value={password} onChange={handlePassword} type="password" placeholder="Password" />
          </FloatingLabel>
        </InputGroup>
        <Button className=" btn-lg mb-2 w-100" variant="primary" type="submit" disabled={isSubmitLoading}>
          {isSubmitLoading &&
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          }
          {` Sign up`}
        </Button>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          Or you can <Link href="/auth/sign-in">Sign In</Link>
        </Form.Group>
        {errorMsg &&
          <Form.Group className="mb-3">
            <Alert variant={'danger'}>
              {errorMsg}
            </Alert>
          </Form.Group>
        }
      </Form>
    </>
  );
};

export default SignUp;