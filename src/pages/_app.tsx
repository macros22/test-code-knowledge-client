import { useContext } from 'react'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';

import '@/app2/global.css'
import { ThemeContextProvider } from '@/contexts/theme.context'
import { ThemeProvider } from 'next-themes'
import { isDev, isProd } from '@/lib/config';

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log('isDev', isDev)
  console.log('isProd', isProd)
  return (
    <ThemeContextProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        enableColorScheme
      >
        <Component {...pageProps} />
        <NextNProgress
          color="#09a180"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow
        />
      </ThemeProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
