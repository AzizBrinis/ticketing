import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});
it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({}).expect(401);
});
it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({});

  expect(response.status).not.toEqual(401);
});
it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({
      price: 10,
    })
    .expect(400);
});
it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({
      title: "Test",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({
      title: "Test",
    })
    .expect(400);
});
it("creates a ticket with valid inputs", async () => {
  let ticket = await Ticket.find({});
  expect(ticket.length).toEqual(0);

  const title = "test";
  const price = 5;

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({ title, price })
    .expect(201);

  ticket = await Ticket.find({});
  expect(ticket.length).toEqual(1);
  expect(ticket[0].price).toEqual(price);
  expect(ticket[0].title).toEqual(title);
});

it("publishes an event", async () => {
  let ticket = await Ticket.find({});
  expect(ticket.length).toEqual(0);

  const title = "test";
  const price = 5;

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({ title, price })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
