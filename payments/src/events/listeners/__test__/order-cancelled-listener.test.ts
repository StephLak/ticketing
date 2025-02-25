import {  OrderCancelledEvent, OrderStatus } from "@strticket/common";
import { natsWrapper } from "../../../nats-wrapper"
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 10,
        userId: 'adfdf',
        version: 0,
    });
    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: 'asdfkdf'
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, order, data, msg };
}

it('updates the status of the order', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(data.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
}, 50000);

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});