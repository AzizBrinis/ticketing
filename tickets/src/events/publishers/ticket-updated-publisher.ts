import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@udemylearningticketingproject/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
