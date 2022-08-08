
import { Auth } from 'components/auth/Auth/Auth';
import { SignIn } from 'components/auth/SignIn/SignIn';
import { SignUp } from 'components/auth/SignUp/SignUp';
import { withLayout } from 'layouts/AuthLayout/AuthLayout';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Card, Container } from 'react-bootstrap';

interface IAuthPageProps extends Record<string, string> {
	authMode: 'sign-in' | 'sign-up';
}

export const getServerSideProps: GetServerSideProps<IAuthPageProps> = async (
	context
) => {
	const authMode = context.query['authMode'] == 'sign-up' ? 'sign-up' : 'sign-in';
	return { props: { authMode } };
};

const AuthPage = ({ authMode }: IAuthPageProps): JSX.Element => {
	return (
		<>
			<Auth authMode={authMode} />
		</>);
};

export default withLayout(AuthPage);
