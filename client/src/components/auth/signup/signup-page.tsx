import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../layout/Layout';
import useRequest, { HttpMethod } from '../../../hooks/useRequest';

export default function SignupPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: HttpMethod.POST,
    body: { email, password },
  });

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    doRequest<{ email: string; id: string }>()
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout {...props} title={'Sign up'}>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
}
