import { useContext } from 'react'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import '@/app2/global.css'
import { ThemeContextProvider } from '@/contexts/theme.context'
import { ThemeProvider } from 'next-themes'
import { isDev, isProd } from '@/lib/config'
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'

import 'keen-slider/keen-slider.min.css'

import { frontendConfig } from '../config/frontendConfig'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button/scroll-to-top-button'

import { Inter, Lato, Oswald, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: '400',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: '300',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
})

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
          <main className={`${inter.className} tracking-wide`}>
            <Component {...pageProps} />
          </main>
          <NextNProgress
            color="#a15509"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow
          />
          <ScrollToTopButton />
        </ThemeProvider>
      </ThemeContextProvider>
    </SuperTokensWrapper>
  )
}

export default MyApp
