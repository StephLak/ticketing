import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    })

    // All moved to the abstract class
    // const options = stan
    //     .subscriptionOptions()
    //     .setManualAckMode(true)
    //     .setDeliverAllAvailable()
    //     .setDurableName('order-service');

    // const subscription = stan.subscribe(
    //     'ticket:created',
    //     'queue-group-name',
    //     options
    // );
    // subscription.on('message', (msg: Message) => {
    //     const data = msg.getData();

    //     if (typeof data === 'string') {
    //         console.log(`Received event ${msg.getSequence()} with ${data}`);
    //     }

    //     msg.ack();
    // });

    new TicketCreatedListener(stan).listen();

});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());



