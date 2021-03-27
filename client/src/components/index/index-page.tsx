import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/auth-context';
// import { InferGetServerSidePropsType } from 'next';
// import { getServerSideProps } from '../../pages/index';

// export default function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function Index(props) {
  const { isAuth } = useContext(AuthContext)

  return (
    <Layout {...props}>
      { isAuth ? <h1>You are sign in</h1> : <h1>You are not sign in</h1>}
    </Layout>
  );
}
