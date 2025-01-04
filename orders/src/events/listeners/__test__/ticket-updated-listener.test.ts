import {
  TicketCreatedEvent,
  TicketUpdatedEvent,
} from "@udemylearningticketingproject/common";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { TicketCreatedListener } from "../ticket-created-listener";

const createTicket = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);
  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Adele",
    price: 50,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  await listener.onMessage(data, msg);

  return { data };
};

const setupUpdate = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, msg };
};

it("updates and saves a ticket", async () => {
  const { data } = await createTicket();

  const updatedData: TicketUpdatedEvent["data"] = {
    version: data.version + 1,
    id: data.id,
    title: "Adele Concept",
    price: 290,
    userId: data.userId,
  };

  const { listener, msg } = await setupUpdate();

  await listener.onMessage(updatedData, msg);

  const updatedTicket = await Ticket.findById(data.id);

  expect(updatedTicket).toBeDefined();
  expect(updatedTicket!.title).toEqual(updatedData.title);
  expect(updatedTicket!.price).toEqual(updatedData.price);
});

// it("ack message", async () => {
//   const { listener, data, msg } = await setup();

//   await listener.onMessage(data, msg);

//   expect(msg.ack).toHaveBeenCalled();
// });
