import * as React from 'react'
import { FC, useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import cn from 'clsx'
// const Header = dynamic(() => import('../Header/Header'))
// const Footer = dynamic(() => import('../Footer/Footer'))
// import { Footer } from "layouts";
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ThemeContext } from '@/contexts/theme.context'
import { Header } from '@/layouts/header/header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Link } from 'lucide-react'
import { Container } from '@/components/Container'
import { Footer } from '../footer'
// import Header from "layouts/Header/Header";

export const MainLayout: FC = ({ children }) => {
  // const { isLoggedIn } = useUser();
  // const router = useRouter();

  // React.useEffect(() => {
  //   if (!isLoggedIn) {
  //     // router.replace('/auth/sign-in')
  //   };
  // }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   return (
  //     <Spinner
  //       as="span"
  //       animation="border"
  //       size="sm"
  //       role="status"
  //       aria-hidden="true" />);
  // }

  return (
    <>
      <Head>
        <title>Test code knowledge</title>
        <meta name="description" content="Test code knowledge." />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="typescript, node.js, javascript, test, knowledge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="mb-auto h-full bg-gray-100 pt-5 dark:bg-background">
          <Container>{children}</Container>
        </main>
        <Footer />

        <TailwindIndicator />
      </div>
    </>
  )
}
