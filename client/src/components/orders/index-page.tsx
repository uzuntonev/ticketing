import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/auth-context';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '../../pages/orders/index';
import Link from 'next/link';

export default function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const ordersList = props.orders.map(order => {
    return (
      <tr key={order.id}>
        <td>
          <Link href="/orders/[orderId]" as={`/orders/${order.id}`}>
            <a>{order.ticket.title}</a>
          </Link>
        </td>
        <td>{ order.ticket.price }</td>
        <td>{ order.status }</td>
      </tr>
    )
  })

  return (
    <Layout {...props}>
      <h1>Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordersList}
        </tbody>
      </table>
    </Layout>
  );
}
