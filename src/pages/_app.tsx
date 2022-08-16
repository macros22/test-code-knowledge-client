import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {

	return (

		<Component {...pageProps} />

	);
}

export default MyApp;
