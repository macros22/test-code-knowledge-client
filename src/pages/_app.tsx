import type { AppProps } from 'next/app';
import NextNProgress from "nextjs-progressbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/globals.scss';
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<Component {...pageProps} />
			<NextNProgress
				color="#09a180"
				startPosition={0.3}
				stopDelayMs={200}
				height={2}
				showOnShallow={true}
			/>
		</SSRProvider>

	);
}

export default MyApp;
