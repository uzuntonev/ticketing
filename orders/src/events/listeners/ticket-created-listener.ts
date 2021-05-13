import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@gutickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupeName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupeName = queueGroupeName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;

        const ticket = Ticket.build({ id, title, price });
        await ticket.save();

        msg.ack();
    }
}