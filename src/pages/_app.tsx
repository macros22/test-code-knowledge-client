import { useContext } from 'react'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/app2/global.css'
import { ThemeContextProvider } from '@/contexts/theme.context'
import { ThemeProvider } from 'next-themes'
import { isDev, isProd } from '@/lib/config'
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'

import { frontendConfig } from '../config/frontendConfig'

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SuperTokensWrapper>
      <ThemeContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
        >
          <Component {...pageProps} />
          <NextNProgress
            color="#a15509"
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow
          />
        </ThemeProvider>
      </ThemeContextProvider>
    </SuperTokensWrapper>
  )
}

export default MyApp
