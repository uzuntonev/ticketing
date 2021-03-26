import React from 'react';
import Head from 'next/head';
import Nav from './Nav';

type LayoutProps = React.PropsWithChildren<{
  title?: string;
}>;

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};
export default function Layout({ children, title }: LayoutProps) {
  return (
    <div style={layoutStyle}>
      <Nav />
      {children}
    </div>
  );
}
