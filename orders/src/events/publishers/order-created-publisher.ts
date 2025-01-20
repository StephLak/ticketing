import { Publisher, Subjects, OrderCreatedEvent } from '@strticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}