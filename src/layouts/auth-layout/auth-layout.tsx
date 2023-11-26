import { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthLayoutProps } from './auth-layout.props'
import { useUser } from '@/lib/hooks'
import { TailwindBreakpointsIndicator } from '@/components/tailwind-indicator'
import { Container } from '@/components/container'

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { isLoggedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) router.replace('/')
  }, [isLoggedIn, router])

  if (isLoggedIn) {
    return <div>spinner</div>
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
      <main>
        <Container className="mt-16 mx-auto !max-w-xl px-6">{children}</Container>
        <TailwindBreakpointsIndicator />
      </main>
    </>
  )
}
