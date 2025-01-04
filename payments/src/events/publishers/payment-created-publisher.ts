import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@udemylearningticketingproject/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
