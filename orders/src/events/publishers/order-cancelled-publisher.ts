import { Publisher, Subjects, OrderCancelledEvent } from '@strticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}