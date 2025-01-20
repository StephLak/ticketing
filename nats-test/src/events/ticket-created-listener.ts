import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    // subject: Subjects.TicketCreated = Subjects.TicketCreated; // This is to make sure that subject is always Subjects.TicketCreated and can never be changed, even to Subjects.OrderUpdated
    readonly subject = Subjects.TicketCreated; // readonly works as final keyword and it can be used instead of the above
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}
