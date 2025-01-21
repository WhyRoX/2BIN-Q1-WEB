import path from "node:path";
import { Ticket, NewTicket } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/tickets.json");

function createTicket(newTicket: NewTicket, username: string): Ticket {
  const tickets: Ticket[] = parse(jsonDbPath, []);
  const lastId = tickets.length > 0 ? tickets[tickets.length - 1].id : 0;
  const ticket: Ticket = {
    id: lastId + 1,
    ...newTicket,
    user: username,
    creationDate: new Date(),
  };
  const updatedTickets = [...tickets, ticket];
  serialize(jsonDbPath, updatedTickets);
  return ticket;
}

function readAllTickets(): Ticket[] {
  return parse(jsonDbPath, []);
}

export { createTicket, readAllTickets };
