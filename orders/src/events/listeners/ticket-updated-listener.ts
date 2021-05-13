import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@gutickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupeName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupeName = queueGroupeName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}