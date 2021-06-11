import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

export type SessionWithUserid = Session & { userId?: number };

export type MyContext = {
  req: Request & { session?: SessionWithUserid };
  res: Response;
  redis: Redis;
};
