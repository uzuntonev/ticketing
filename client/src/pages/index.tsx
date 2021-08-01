import axios from 'axios';
import { GetServerSideProps } from 'next';
import buildClient from '../api/build-client';
import IndexPage from '../components/index/index-page';

type Ticket = {
  title: string,
  price: number,
  userId: string,
  version: number,
  id: string
}
type IndexPageProps = {
  tickets: Ticket[]
  currentUser?: { id: string; email: string; iat: number };
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/tickets');

  return {
    props: {
          tickets: data
    },
  };
};

// IndexPage['getInitialProps'] = async context => {
//   console.log('LANDING PAGE!');
//   // const client = buildClient(context);
//   // const { data } = await client.get('/api/users/currentuser');

//   return { };
// };

export default IndexPage;
