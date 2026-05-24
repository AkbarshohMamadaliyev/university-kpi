import { FastifyInstance } from "fastify";
import { register, login } from "./auth.controller";
import { registerJsonSchema, loginJsonSchema } from "./auth.schema";

export const authRoutes = async (app: FastifyInstance) => {
  app.post(
    "/register",
    { schema: { ...registerJsonSchema, tags: ["Auth"] } },
    register
  );

  app.post(
    "/login",
    { schema: { ...loginJsonSchema, tags: ["Auth"] } },
    login
  );
};