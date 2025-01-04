import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from "@udemylearningticketingproject/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
