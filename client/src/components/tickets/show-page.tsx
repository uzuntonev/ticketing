import React from 'react';
import Router from 'next/router';
import Layout from '../layout/Layout';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '../../pages/tickets/[ticketId]';
import useRequest, { HttpMethod } from '../../hooks/useRequest';

type PurchaseTicketBody = {
  ticketId: string
}
type PurchaseTicketResponse = {
  expiresAt: string,
  id: string,
  status: string
  ticket: {title: string , price: number, version: number, id: string}
  userId: string,
  version: number
}

export default function TicketShowPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { ticket } = props;
  const { doRequest, errors } = useRequest<PurchaseTicketBody>({
    url: '/api/orders',
    method: HttpMethod.POST,
    body: { ticketId: ticket.id },
  });
  const purchaseTicket = () => {
    doRequest<PurchaseTicketResponse>()
      .then(order => {
        Router.push('/orders/[orderId]', `/orders/${order.id}`)
    })
    .catch(error => console.error(error))
  }

  return (
    <Layout {...props}>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {!!errors && (
          <div className="alert alert-danger">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {errors.map((err, index) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          </div>
      )}
      <button className="btn btn-primary" onClick={purchaseTicket}>Purchase</button>
    </Layout>
  );
}
