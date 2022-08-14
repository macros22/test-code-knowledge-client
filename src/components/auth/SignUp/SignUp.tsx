import { authApi } from 'libs/auth.api';
import Link from 'next/link';
import React from 'react';
import { Button, FloatingLabel, Form, InputGroup, Spinner } from 'react-bootstrap';
import { BsFillLockFill, BsFillPersonFill, BsFillEnvelopeFill } from "react-icons/bs";

export const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && name && password) {
      setIsSubmitLoading(true);
      const user = await authApi.signUp({ email, name, password });
      console.log(user)
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
        Or you can <Link href="/auth/sign-in"><strong>Sign In</strong></Link>
      </Form.Group>

    </Form>
  );
};
