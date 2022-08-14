
import React from 'react';
import { Auth } from 'components/auth/Auth/Auth';
import { withLayout } from 'layouts/AuthLayout/AuthLayout';
import { GetServerSideProps } from 'next';

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
