
import { useUser } from 'hooks/useUser';
import { authApi } from 'libs/auth.api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { BsFillKeyFill, BsFillPersonFill } from "react-icons/bs";


export const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const { mutate, loggedIn, user } = useUser();

	const router = useRouter();

	// const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'commonWords');

	React.useEffect(() => {
		if (loggedIn) router.replace('/');

	}, [loggedIn]);

	if (loggedIn) return <> Redirecting.... </>;



	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email && password) {
			const accessToken = await authApi.login(email, password);
			mutate();

		}
		// console.log({
		// 	email,
		// 	password,
		// });
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

					<BsFillPersonFill />
				</InputGroup.Text>
				<FloatingLabel
					controlId="floatingInput"
					label="Email"

				>
					<Form.Control value={email} onChange={handleEmail} type="email" placeholder="Enter email" />
				</FloatingLabel>
			</InputGroup>

			<InputGroup className="mb-3">
				<InputGroup.Text id="basic-addon1" >
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
						<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
					</svg>
				</InputGroup.Text>
				<FloatingLabel
					controlId="floatingInput"
					label="Password"

				>
					<Form.Control value={password} onChange={handlePassword} type="password" placeholder="Password" />
				</FloatingLabel>
			</InputGroup>

			{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
				<Form.Check type="checkbox" label="Check me out" />
			</Form.Group> */}
			<Button className=" btn-lg mb-2 w-100" variant="primary" type="submit">
				Sign in
			</Button>
			<Form.Group className="mb-3" controlId="formBasicCheckbox">
				Or you can <Link href="/auth/sign-up"><strong>Sign Up</strong></Link>
			</Form.Group>

		</Form>
	);
};
