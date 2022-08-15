import { AuthLayout } from "./AuthLayout/AuthLayout";
import { MainLayout } from "./MainLayout/MainLayout";

export const withLayout = <T extends Record<string, unknown>>(
  layoutMode: 'auth' | 'main',
  Component: React.FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {

    return (
      <>
        {layoutMode == 'main' &&
          <MainLayout>
            <Component {...props} />
          </MainLayout>
        }
        {layoutMode == 'auth' &&
          <AuthLayout>
            <Component {...props} />
          </AuthLayout>
        }
      </>
    );
  };
};