import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { AuthContext } from '../../context/auth-context';

type LayoutProps = React.PropsWithChildren<{
  title?: string;
  currentUser?: any
}>;

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};
export default function Layout({ children, title, currentUser }: LayoutProps) {
  const { isAuth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    if (!!currentUser) {
      setAuth({ isAuth: !!currentUser, currentUser })
    } else {
      setAuth({ isAuth: false, currentUser: null })
    };
  }, [])
  return (
    <>
      <div style={layoutStyle}>
        {title && <Head>
          <title>{title}</title>
        </Head>}
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </>
  );
}
