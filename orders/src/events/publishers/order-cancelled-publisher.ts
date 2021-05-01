import { Publisher, Subjects, OrderCancelledEvent } from '@gutickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}