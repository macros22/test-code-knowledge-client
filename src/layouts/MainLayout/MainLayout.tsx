import * as React from "react";
import Head from "next/head";
import styles from "./MainLayout.module.scss";
import { MainLayoutProps } from "./MainLayout.props";
import { Header, Footer } from "layouts";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import { Spinner } from 'react-bootstrap';

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
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
        <title>{"Test code knowledge"}</title>
        <meta name="description" content={`Test code knowledge.`} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={"typescript, node.js, javascript, test, knowledge"}
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

