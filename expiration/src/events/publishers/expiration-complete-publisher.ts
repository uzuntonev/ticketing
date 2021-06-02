import { Publisher, Subjects, ExpirationCompleteEvent } from '@gutickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}