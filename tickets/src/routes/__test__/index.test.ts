import request from "supertest";
import { app } from "../../app";

const title = "test";
const price = 5;

const createTicket = async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signUp())
    .send({ title, price });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(3);
});
