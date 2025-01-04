import {
  Publisher,
  Subjects,
  OrderCreatedEvent,
} from "@udemylearningticketingproject/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
