import { GetServerSideProps } from 'next';
import buildClient from '../../api/build-client';
import IndexPage from '../../components/orders/index-page';

type Order = {
  id: string,
  expiresAt: string,
  status: string,
  ticket: {title: string, price: number, id: string, version: number},
  userId: string,
  version: number
}
type IndexPageProps = {
  orders: Order[]
  currentUser?: { id: string; email: string; iat: number };
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/orders');

  return {
    props: {
          orders: data
    },
  };
};

export default IndexPage;
