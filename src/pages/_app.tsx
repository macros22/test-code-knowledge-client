import '../styles/globals.css'
import '../components/checkbox/checkbox.scss'


import type { AppProps } from 'next/app'


import { Provider } from 'react-redux'
import store, { persistor } from '../app/store'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp
