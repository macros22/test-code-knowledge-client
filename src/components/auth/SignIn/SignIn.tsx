
import { useUser } from 'hooks/useUser';
import { authApi } from 'libs/auth.api';
import Link from 'next/link';
import React from 'react';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { BsFillLockFill, BsFillEnvelopeFill } from "react-icons/bs";


export const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const { mutate: mutateUser } = useUser();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email && password) {
			const accessToken = await authApi.signIn({ email, password });
			mutateUser();
		}
	};

	const handleEmail = (event) => {
		setEmail(event.currentTarget.value);
	};

	const handlePassword = (event) => {
		setPassword(event.currentTarget.value);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className="mb-3">
				<InputGroup.Text id="basic-addon1">
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
					<BsFillLockFill />
				</InputGroup.Text>
				<FloatingLabel
					controlId="floatingInput"
					label="Password"

				>
					<Form.Control value={password} onChange={handlePassword} type="password" placeholder="Password" />
				</FloatingLabel>
			</InputGroup>
			<Button className=" btn-lg mb-2 w-100" variant="primary" type="submit">
				Sign in
			</Button>
			<Form.Group className="mb-3" controlId="formBasicCheckbox">
				Or you can <Link href="/auth/sign-up"><strong>Sign Up</strong></Link>
			</Form.Group>

		</Form>
	);
};
