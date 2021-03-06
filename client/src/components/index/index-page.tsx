import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/auth-context';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '../../pages/index';
import Link from 'next/link';

export default function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isAuth } = useContext(AuthContext);

  const ticketsList = props.tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>{ticket.title}</a>
          </Link>
        </td>
        <td>{ ticket.price }</td>
      </tr>
    )
  })

  return (
    <Layout {...props}>
      {/* { isAuth ? <h1>You are sign in</h1> : <h1>You are not sign in</h1>} */}
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ticketsList}
        </tbody>
      </table>
    </Layout>
  );
}
