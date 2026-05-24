import { FastifyReply } from "fastify";

export const sendSuccess = (
  reply: FastifyReply,
  data: unknown,
  message = "Success",
  statusCode = 200
) => {
  return reply.status(statusCode).send({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  reply: FastifyReply,
  message = "Something went wrong",
  statusCode = 500,
  errors?: unknown
) => {
  return reply.status(statusCode).send({
    success: false,
    message,
    errors: errors ?? null,
  });
};