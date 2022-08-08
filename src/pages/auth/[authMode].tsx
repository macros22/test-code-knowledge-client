
import React from 'react';
import { Auth } from 'components/auth/Auth/Auth';
import { withLayout } from 'layouts/AuthLayout/AuthLayout';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useUser } from 'hooks/useUser';

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
	// const { loggedIn } = useUser();

	// const router = useRouter();

	// React.useEffect(() => {
	// 	if (loggedIn) router.replace('/');

	// }, [loggedIn]);

	// if (loggedIn) return <> Redirecting.... </>;
	return (
		<>
			<Auth authMode={authMode} />
		</>);
};

export default withLayout(AuthPage);
