import { Publisher, Subjects, OrderCreatedEvent } from '@gutickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}