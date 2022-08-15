import * as React from "react";
import Head from "next/head";
import styles from "./AuthLayout.module.scss";
import { AuthLayoutProps } from "./AuthLayout.props";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import { Spinner } from 'react-bootstrap';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children
}) => {
  const { loggedIn } = useUser();

  const router = useRouter();

  React.useEffect(() => {
    if (loggedIn) router.replace('/');

  }, [loggedIn]);

  if (loggedIn) {
    return (
      <div className={styles.wrapper}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" />
      </div>);
  }

  return (
    <>
      <Head>
        <title>{"Auth Test knowledge"}</title>
        <meta name="description" content={`Auth Test knowledge.`} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={"javascript, test, knowledge"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <main className={styles.body}>{children}</main>
      </div>
    </>
  );
};
