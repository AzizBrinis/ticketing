import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

const title = "test";
const price = 5;
const id = new mongoose.Types.ObjectId().toHexString();

it("returns 404 if the id provided does not exist", async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signUp())
    .send({
      title: "Test",
      price: 10,
    })
    .expect(404);
});

it("returns a 401 is the user is not authenticated", async () => {
  await request(app).put(`/api/tickets/${id}`).send().expect(401);
});
it("returns a 401 is the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({
      title: "Test",
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signUp())
    .send({
      title: "Test",
      price: 100,
    })
    .expect(401);
});
it("returns a 400 is the user provided an invalid title or price", async () => {
  const session = global.signUp();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", session)
    .send({
      title: "Test",
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", session)
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", session)
    .send({
      title: "Title",
      price: -10,
    })
    .expect(400);
});

it("update the ticket provided valid inputs", async () => {
  const session = global.signUp();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", session)
    .send({
      title: "Test",
      price: 10,
    })
    .expect(201);

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", session)
    .send({
      title: "title",
      price: 20,
    })
    .expect(400);
});

it("update the ticket provided valid inputs", async () => {
  const session = global.signUp();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", session)
    .send({
      title: "Test",
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", session)
    .send({
      title: "title",
      price: 20,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.price).toEqual(20);
  expect(ticketResponse.body.title).toEqual("title");
});

it("publishes an event", async () => {
  const session = global.signUp();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", session)
    .send({
      title: "Test",
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", session)
    .send({
      title: "title",
      price: 20,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
