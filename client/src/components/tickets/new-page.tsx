import React, {
  SyntheticEvent,
  useContext, 
  useState
} from 'react';
import router from 'next/router';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/auth-context';
import useRequest, { HttpMethod } from '../../hooks/useRequest';

type NewTicketResponse = {
  title: string,
  price: number,
  userId: string,
  version: number,
  id: string
}

type NewTicketBody = {
  title: string,
  price: string
}

export default function NewPage (props) {
  const { isAuth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest<NewTicketBody>({
    url: '/api/tickets',
    method: HttpMethod.POST,
    body: { title, price },
  });
  
  const onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = parseFloat(price);
    if (isNaN(value)) { return; }
    setPrice(value.toFixed(2));
  }

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    doRequest<NewTicketResponse>()
      .then(res => {
        clearForm();
        router.push('/')
      })
      .catch(error => console.error(error))
  }

  const clearForm = () => {
    setTitle('');
    setPrice('');
  }
  return (
    <Layout {...props}>
      <h1>Create Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value) }/>
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={e => setPrice(e.target.value)}
            onBlur={onBlur}/>
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  );
}
