import { AppProps } from 'next/app';
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ticketing.dev</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
