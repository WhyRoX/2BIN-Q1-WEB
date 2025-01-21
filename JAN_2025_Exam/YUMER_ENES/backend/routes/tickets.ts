import { Router } from "express";
import { AuthenticatedRequest, Ticket } from "../types";
import { createTicket, readAllTickets } from "../services/tickets";
import { authorize } from "../utils/auths";

const router = Router();

// Create a ticket
router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("description" in body) ||
    typeof body.title !== "string" ||
    typeof body.description !== "string" ||
    !body.title.trim() ||
    !body.description.trim()
  ) {
    return res.sendStatus(400);
  }

  const authenticatedReq = req as AuthenticatedRequest;
  if (
    !authenticatedReq.user ||
    typeof authenticatedReq.user !== "object" ||
    !("username" in authenticatedReq.user) ||
    typeof authenticatedReq.user.username !== "string"
  ) {
    return res.sendStatus(401);
  }

  const existingTickets = readAllTickets();
  if (existingTickets.some((ticket) => ticket.title === body.title)) {
    return res.status(409).send("A ticket with the same title already exists.");
  }

  const newTicket: Omit<Ticket, "id"> = {
    title: body.title,
    description: body.description,
    user: authenticatedReq.user.username,
    creationDate: new Date(),
  };
  const addedTicket = createTicket(newTicket, authenticatedReq.user.username);
  return res.status(201).json(addedTicket);
});

// Get the ticket created by the user
router.get("/ticket/:id", authorize, (req, res) => {
  const authenticatedReq = req as AuthenticatedRequest;
  const tickets = readAllTickets();
  const userTicket = tickets.find(
    (ticket) => ticket.user === authenticatedReq.user?.username
  );
  if (!userTicket) {
    return res.sendStatus(404);
  }
  return res.json(userTicket);
});

export default router;
