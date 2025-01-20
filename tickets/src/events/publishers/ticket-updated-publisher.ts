import { Publisher, Subjects, TicketUpdatedEvent } from '@strticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}