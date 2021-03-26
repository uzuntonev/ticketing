import axios from 'axios';
import { GetServerSideProps } from 'next';
import IndexPage from '../components/index/IndexPage';

type CurrentUser = {
  currentUser: { id: string; email: string; iat: number };
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await axios.get<CurrentUser>(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      headers: req.headers,
    }
  );

  return {
    props: {
      currentUser: data.currentUser,
    },
  };
};

export default IndexPage;
