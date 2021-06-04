import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { stripe } from '../../stripe';

jest.mock('../../stripe');

it('has a route handler listening to /api/payments for post request', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(404);
});

it('returns a 404 when purchasing an order that does no exit', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      orderId: mongoose.Types.ObjectId().toHexString(),
      token: 'asd1234fd'
    })
    .expect(404)
});

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();

  const cookie = global.signin();
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      orderId: order.id,
      token: 'asd1234fd'
    })
    .expect(401)
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 10,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  const cookie = global.signin(userId);
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      orderId: order.id,
      token: 'asd1234fd'
    })
    .expect(400)
});

it('returns a 204 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();

  const cookie = global.signin(userId);
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      orderId: order.id,
      token: 'tok_visa'
    })
    .expect(201);

  expect(stripe.charges.create).toHaveBeenCalled();

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  expect(chargeOptions.source).toEqual('tok_visa');
  expect(chargeOptions.amount).toEqual(10 * 100);
  expect(chargeOptions.currency).toEqual('usd');
})
