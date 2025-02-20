import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

process.env.STRIPE_KEY =
  "sk_test_51Qg15AKC8A8S1GrvyE1KEWtbLLc9ACTvp5Tr49E003O748bQvuePtwoGs8ooYkdDGd0sCiZDZonn0IMpXB0mkRSe00cPuoOnnw";
let mongo: any;

declare global {
  var signUp: (id?: string) => string[];
}

jest.mock("../nats-wrapper");

beforeAll(async () => {
  process.env.JWT_KEY = "r54grtg5rtg9r6grgr";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});
beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signUp = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`session=${base64}`];
};
