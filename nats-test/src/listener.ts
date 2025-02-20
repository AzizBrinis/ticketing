import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-create-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("accounting-service");

  // const subscription = stan.subscribe(
  //   "ticket:created",
  //   "order-service-queue-group",
  //   options
  // );

  // subscription.on("message", (msg: Message) => {
  //   const data = msg.getData();
  //   if (typeof data === "string") {
  //     console.log(`Event #${msg.getSequence()}: ${data}`);
  //   }
  //   msg.ack();
  // });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
