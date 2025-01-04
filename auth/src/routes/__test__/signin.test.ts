import request from "supertest";
import { app } from "../../app";

it("fails when an email doesn't exist", async () => {
  return request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "123456789",
    })
    .expect(400);
});

it("responds with a cookie when valid credentials supplied", async () => {
  await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/users/sign-in")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
