import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import {store} from 'store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<Provider store={store}>
				<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
