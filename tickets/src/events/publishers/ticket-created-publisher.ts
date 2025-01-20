import { Publisher, Subjects, TicketCreatedEvent } from '@strticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}