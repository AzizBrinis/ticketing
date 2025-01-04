import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@udemylearningticketingproject/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

// jest.mock("../../stripe");

it("throw a 404 error if order is not found", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signUp())
    .send({
      token: "sfhwef",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});
it("throws a 401 error if the order belongs to a differrent user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    version: 0,
    price: 200,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signUp())
    .send({
      token: "sfhwef",
      orderId: order.id,
    })
    .expect(401);
});
it("throw a 400 error if order status is cancelled", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    version: 0,
    price: 200,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signUp(order.userId))
    .send({
      token: "sfhwef",
      orderId: order.id,
    })
    .expect(400);
});
it("returns 201 with valid inputs", async () => {
  const price = Math.floor(Math.random() * 100000);
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    version: 0,
    price,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signUp(order.userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  // const stripeCharges = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  // expect(stripeCharges.source).toEqual("tok_visa");
  // expect(stripeCharges.currency).toEqual("usd");
  // expect(stripeCharges.amount).toEqual(200 * 100);

  const stripeCharges = await stripe.charges.list({ limit: 50 });
  const stripeCharge = stripeCharges.data.find(
    (charge) => charge.amount === price * 100
  );

  expect(stripeCharge).toBeDefined();
  expect(stripeCharge!.currency).toEqual("usd");

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });

  expect(payment).not.toBeNull();
});
