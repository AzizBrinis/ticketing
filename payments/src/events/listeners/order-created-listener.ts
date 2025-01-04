import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@udemylearningticketingproject/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-groupe-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      userId: data.userId,
      status: data.status,
      version: data.version,
      price: data.ticket.price,
    });

    await order.save();

    msg.ack();
  }
}
