import { FC } from 'react';

import { AuthLayout } from './AuthLayout/AuthLayout';
import { MainLayout } from './MainLayout/MainLayout';

export const withLayout = <T extends Record<string, unknown>>(
  layoutMode: 'auth' | 'main',
  Component: FC<T>,
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    const Layout = layoutMode === 'main' ? MainLayout : AuthLayout;

    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
