import React from 'react';
import { AppProps } from 'next/app';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/styles.scss';
import '../styles/menu.scss';

import '../styles/index.scss';
import '../styles/about.scss';
import '../styles/chat.scss';

import Head from 'next/head';

import setting from '../setting';
import { DataContext } from '../src/DataContext';
import SharedData from '../src/SharedData';
import getPublicKey from '../util/fn.getPublicKey';
import getPrivateKey from '../util/fn.getPrivateKey';

const prime1 = 13;
const prime2 = 17;
const publicKey = getPublicKey(prime1, prime2);
const privateKey = getPrivateKey(prime1, prime2, publicKey);

if (publicKey[0] !== privateKey[0]) {
  throw new Error('publicKey[0] !== privateKey[0]');
}

const [public_n, public_e] = publicKey;
const [private_n, private_d] = privateKey;

export {
  prime1,
  prime2,
  public_n,
  public_e,
  private_n,
  private_d,
}

export default function MyApp({ Component, pageProps }: AppProps) {

  const [sharedData, setSharedData] = useState<SharedData>({
    username: 'user_xxx',
    message: 'Hello everyone!',
    public_n,
    public_e,
    private_n,
    private_d,
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{setting.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href={`${setting.basePath}/favicon.ico`} />
      </Head>
      <DataContext.Provider value={{sharedData, setSharedData}}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </>
  );
};
