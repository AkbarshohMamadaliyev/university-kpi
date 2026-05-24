import { FastifyRequest, FastifyReply } from "fastify";

export type Role = "TEACHER" | "DEPARTMENT" | "INSPECTOR";

export interface JwtPayload {
  id: number;
  email: string;
  role: Role;
}

export type AppRequest = FastifyRequest;
export type AppReply = FastifyReply;

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}