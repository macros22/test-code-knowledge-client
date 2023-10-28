import { useContext } from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ThemeContext, ThemeContextProvider } from 'contexts/theme.context';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SSRProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
        <NextNProgress
          color="#09a180"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow
        />
      </ThemeContextProvider>
    </SSRProvider>
  );
};

export default MyApp;
