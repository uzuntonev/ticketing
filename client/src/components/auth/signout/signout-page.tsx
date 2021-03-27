import { useEffect } from 'react';
import router from 'next/router';
import useRequest, { HttpMethod } from '../../../hooks/useRequest';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: HttpMethod.POST,
    body: {},
  });

  useEffect(() => {
    doRequest().then(() => {
      router.push('/');
    })
      .catch((err) => {
        console.error(err);
      });;
  }, []);

  return <div>Signing you out...</div>;
};
