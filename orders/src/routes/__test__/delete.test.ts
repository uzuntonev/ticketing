import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('marks an order as cancelled', async () => {
  // Create Ticket with Ticket Model
  const ticket = Ticket.build({
    title: 'asdasd',
    price: 10
  });
  await ticket.save();

  const user = global.signin();

  // Make request create an Order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to cancel the order
  const response = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // Expectation to make suer the thing is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('returns an error if user tries to delete another user order', async () => {
  // Create Ticket
  const ticket = Ticket.build({
    title: 'asdasd',
    price: 10
  });
  await ticket.save();

  const user = global.signin();
  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  // Make request to fetch the order
  const response = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .expect(401);
});

it.todo('todo emits an order cancelled event')