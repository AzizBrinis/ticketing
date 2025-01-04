import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@udemylearningticketingproject/common";
import { natsWrapper } from "../../nats-wrapper";

it("retrun an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signUp())
    .send({ ticketId })
    .expect(404);
});
it("retrun an error if the ticket is reserved", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Adele",
    price: 200,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "dgerucne",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signUp())
    .send({ ticketId: ticket.id })
    .expect(400);
});
it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Adele",
    price: 200,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signUp())
    .send({ ticketId: ticket.id })
    .expect(201);
});
it("emits a create ticket event", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Adele",
    price: 200,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signUp())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
