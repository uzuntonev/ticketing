import React from 'react';
import Layout from '../layout/Layout';

export default function Index({ currentUser }) {
  console.log(currentUser);
  return (
    <Layout>
      <h1>Hello Kotka</h1>
    </Layout>
  );
}
