import React from 'react';
import { Auth } from 'components/auth/Auth/Auth';
import { GetServerSideProps } from 'next';
import { withLayout } from 'layouts';
import { AuthPageProps } from 'libs/interfaces/user.interface';

export const getServerSideProps: GetServerSideProps<
  AuthPageProps
> = async context => {
  const authMode =
    context.query['authMode'] == 'sign-up' ? 'sign-up' : 'sign-in';
  return { props: { authMode } };
};

const AuthPage = ({ authMode }: AuthPageProps): JSX.Element => {
  return <Auth authMode={authMode} />;
};

export default withLayout('auth', AuthPage);
