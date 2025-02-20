import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@udemylearningticketingproject/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
