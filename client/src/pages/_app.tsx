import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import AppNavBar from '../components/layout/AppNavBar';
import buildClient from '../api/build-client';
import AuthProvider from '../context/auth-context';

type CurrentUserResponse = {
  currentUser: {
    email: string,
    iat: number
    id: string
  }
}
const AppComponent = ({ Component, pageProps, currentUser }: AppProps) => {
  return (
    <AuthProvider>
      <Head>
        <title>Ticketing.dev</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppNavBar currentUser={currentUser} />

      <Component {...pageProps} currentUser={currentUser} />
    </AuthProvider>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get<CurrentUserResponse>('/api/users/currentuser');

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return {
    pageProps,
    currentUser: data.currentUser
  };
};

export default AppComponent;
