import { GetServerSideProps } from 'next';
import buildClient from '../../api/build-client';
import OrderShowPage from '../../components/orders/show-page';

type Order = {
    id: string,
    expiresAt: string,
    status: string,
    ticket: {title: string, price: number, id: string, version: number},
    userId: string,
    version: number
}

type ShowOrderPageProps = {
  order: Order
  currentUser?: { id: string; email: string; iat: number };
}
  
  export const getServerSideProps: GetServerSideProps<ShowOrderPageProps> = async (context) => {
    const client = buildClient(context);
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return {
      props: {
            order: data
      },
    };
  };

export default OrderShowPage;
