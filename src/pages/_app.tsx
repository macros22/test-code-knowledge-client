import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import {store} from 'store/store';
import 'assets/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<Provider store={store}>
				<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
