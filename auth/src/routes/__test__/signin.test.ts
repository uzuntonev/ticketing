import request from 'supertest';
import { app } from '../../app';

it('fails when a email that dose not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(400);
})

it('returns 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(200);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '7654321'
    })
    .expect(400);
});


it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'testtestcom',
      password: '1234567'
    })
    .expect(400);
});

it('returns 400 with empty password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: ''
    })
    .expect(400);
});

it('returns 400 with missing email and password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({})
    .expect(400);
});

it('returns 400 with missing email or password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({ password: '1234567' })
    .expect(400);
});