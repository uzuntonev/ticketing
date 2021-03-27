import { GetServerSideProps } from 'next';
import IndexPage from '../components/index/index-page';

// type CurrentUser = {
//   currentUser: { id: string; email: string; iat: number };
// };

// export const getServerSideProps: GetServerSideProps<CurrentUser> = async ({ req }) => {
//   // const { data } = await axios.get<CurrentUser>(
//   //   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//   //   {
//   //     headers: req.headers,
//   //   }
//   // );

//   return {
//     props: {
//       test: 'Kotka',
//     },
//   };
// };

// IndexPage.getInitialProps = async context => {
//   console.log('LANDING PAGE!');
//   // const client = buildClient(context);
//   // const { data } = await client.get('/api/users/currentuser');

//   return { };
// };

export default IndexPage;
