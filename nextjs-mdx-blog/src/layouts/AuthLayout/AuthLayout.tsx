import { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthLayoutProps } from './AuthLayout.props'
import { useUser } from '@/lib/hooks'

const styles = {}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { isLoggedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) router.replace('/')
  }, [isLoggedIn])

  if (isLoggedIn) {
    return (
      <div className={'styles.wrapper'}>
        {/* <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /> */}
        spinner
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Auth Test knowledge</title>
        <meta name="description" content="Auth Test knowledge." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="javascript, test, knowledge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <main className={styles.body}>{children}</main>
      </div>
    </>
  )
}
