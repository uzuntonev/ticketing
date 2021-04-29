import { Publisher, Subjects, TicketUpdatedEvent } from '@gutickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}