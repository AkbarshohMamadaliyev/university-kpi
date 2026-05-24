import { FastifyRequest, FastifyReply } from "fastify";
import { Role } from "../types";

export const authorize = (...roles: Role[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const user = request.user as { id: number; email: string; role: Role };

      if (!roles.includes(user.role)) {
        return reply.status(403).send({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
      }
    } catch (err) {
      return reply.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  };
};