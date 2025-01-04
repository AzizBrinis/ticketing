import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@udemylearningticketingproject/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
