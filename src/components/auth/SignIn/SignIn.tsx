
import { isGuestName } from 'libs/constants/names.storage';
import { useSessionStorage } from 'libs/hooks';
import { useUser } from 'libs/hooks/useUser';
import { authApi } from 'libs/api/auth.api';
import Link from 'next/link';
import React from 'react';
import { Button, FloatingLabel, Form, InputGroup, Spinner } from 'react-bootstrap';
import { BsFillLockFill, BsFillEnvelopeFill } from "react-icons/bs";

const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const { mutateUser } = useUser();

	const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email && password) {
			setIsSubmitLoading(true);
			const accessToken = await authApi.signIn({ email, password });
			setIsSubmitLoading(false);
			mutateUser({ isGuest: false });
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
				{` Sign in`}
			</Button>

			<Form.Group className="mb-3" controlId="formBasicCheckbox">
				Or you can <Link href="/auth/sign-up">Sign Up</Link>
			</Form.Group>

		</Form>
	);
};

export default SignIn;