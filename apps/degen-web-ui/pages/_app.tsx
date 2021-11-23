import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Layout from '../src/layout/layout';
import './styles.scss';
import React from 'react';
import { Provider } from 'next-auth/client';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Degen Bot</title>
      </Head>
      <ChakraProvider>
        <Provider
          options={{
            clientMaxAge: 0,
            keepAlive: 0,
          }}
          session={pageProps.session}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
