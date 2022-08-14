import * as React from "react";
import Head from "next/head";
import styles from "./MainLayout.module.scss";
import { MainLayoutProps } from "./MainLayout.props";
import { Header, Footer } from "layouts";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import { Spinner } from 'react-bootstrap';

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  const { loggedIn } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!loggedIn) {
      router.replace('/auth/sign-in')
    };
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true" />);
  }


  return (
    <>
      <Head>
        <title>{title || "Test knowledge"}</title>
        <meta name="description" content={`Test knowledge.` + description} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={keywords || "javascript, test, knowledge"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.body}>{children}</main>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export type MetaPropsType = Omit<MainLayoutProps, "children">;

export const withLayout = <T extends Record<string, unknown>>(
  Component: React.FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    const metaProps: MetaPropsType = {
      title: `Test knowledge  ${(props?.currentSimulationDimension as string)?.toLowerCase() || ""
        }`,
      description:
        (props?.currentSimulationDimension as string)?.toLowerCase() || "",
    };

    return (
      <MainLayout {...metaProps}>
        <Component {...props} />
      </MainLayout>
    );
  };
};
