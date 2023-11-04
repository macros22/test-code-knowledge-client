import { useContext } from 'react'
// import { SSRProvider } from 'react-bootstrap';
import type { AppProps } from 'next/app'
// import NextNProgress from 'nextjs-progressbar';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'assets/globals.scss';
import '@/app2/global.css'
import { ThemeContextProvider } from '@/contexts/theme.context'
import { ThemeProvider } from 'next-themes'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    // <SSRProvider>
    <ThemeContextProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        enableColorScheme
      >
        <Component {...pageProps} />
        {/* <NextNProgress
          color="#09a180"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow
        /> */}
      </ThemeProvider>
    </ThemeContextProvider>
    // </SSRProvider>
  )
}

export default MyApp
