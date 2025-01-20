import { Publisher, Subjects, PaymentCreatedEvent } from '@strticket/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}