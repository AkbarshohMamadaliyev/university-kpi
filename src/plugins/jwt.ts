import fp from "fastify-plugin";
import fjwt from "@fastify/jwt";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default fp(async (app: FastifyInstance) => {
  app.register(fjwt, {
    secret: process.env.JWT_SECRET!,
    sign: {
      expiresIn: "7d",
    },
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.status(401).send({
          success: false,
          message: "Unauthorized",
        });
      }
    }
  );
});