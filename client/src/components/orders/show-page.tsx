import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import Router from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '../../pages/orders/[orderId]';
import useRequest, { HttpMethod } from '../../hooks/useRequest';
import StripeCheckout, { Token } from 'react-stripe-checkout';

type OrderBody = {
  orderId: string
}
type OrderResponse = {
  id: string,
}

const STRIPE_KEY = "pk_test_51IyGWrGhhFsvg6jDGjY6pMYSdpukTEy8BW9dfOMV1pySGTWO2Fo892L6Oevs5EsD6suFbHvCRASWb9HasxD3l1qW00F69MKszV";

export default function OrderShowPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { order } = props;
  const { email: userEmail } = props.currentUser;

  let orderExpired = false;
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest<OrderBody>({
    url: '/api/payments',
    method: HttpMethod.POST,
    body: { orderId: order.id },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = +new Date(order.expiresAt) - +new Date();
      let minutes: number | string = Math.floor((msLeft / 1000 / 60) % 60);
      let seconds: number | string = Math.floor((msLeft / 1000) % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds >= 60
        ? `00`
        : seconds < 10 ? `0${seconds}` : seconds;

      setTimeLeft(`${minutes}:${seconds}`);
    }
    findTimeLeft()
    const intervalId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const [min, sec] = timeLeft.split(':').map(x => +x);
  if (isNaN(min) || isNaN(sec)) {
    orderExpired = true;
  }

  const handleToken = (token: Token) => {
    doRequest<OrderResponse>({token: token.id})
      .then(payment => {
        Router.push('/orders')
    })
    .catch(error => console.error(error))
  }


  return (
    <Layout {...props}>
      {orderExpired
        ? (<div>Order expired</div>) 
        : (
          <>
            <div>Time left to pay: {timeLeft} minutes</div>
            <StripeCheckout
              token={handleToken}
              stripeKey={STRIPE_KEY}
              amount={order.ticket.price * 1000}
              email={userEmail}
            />
          </>)}
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
    </Layout>
  );
}
