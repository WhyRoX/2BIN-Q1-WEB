import { Request } from "express";

interface AuthenticatedUser {
  username: string;
  token: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

type PotentialUser = Omit<User, "id">;

interface AuthenticatedRequest extends Request {
  user?: User;
}

interface JwtPayload {
  username: string;
  exp: number; // Expiration time (in seconds since the epoch)
  iat: number; // Issued at time (in seconds since the epoch)
}

interface Ticket {
  id: number;
  title: string;
  description: string;
  user: string;
  creationDate: Date;
}

type NewTicket = Omit<Ticket, "id">;

export type {
  AuthenticatedUser,
  User,
  PotentialUser,
  AuthenticatedRequest,
  JwtPayload,
  Ticket,
  NewTicket,
};
