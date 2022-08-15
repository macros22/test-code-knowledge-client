
import React from 'react';
import { Auth } from 'components/Auth/Auth/Auth';
import { GetServerSideProps } from 'next';
import { withLayout } from 'layouts';

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

export default withLayout('auth', AuthPage);
