import { Subjects, Publisher, ExpirationCompleteEvent } from '@strticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}