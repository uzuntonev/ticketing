import { Publisher, Subjects, PaymentCreatedEvent } from '@gutickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}