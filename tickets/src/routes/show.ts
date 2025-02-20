import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@udemylearningticketingproject/common";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    res.send(ticket);
  } catch (error) {
    throw new NotFoundError();
  }
});

export { router as showTicketRouter };
