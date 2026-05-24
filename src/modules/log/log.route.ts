import { FastifyInstance } from "fastify";
import {
  getAllLogs,
  getErrors,
  clearAllLogs,
  clearOldLogs,
} from "./log.controller";
import {
  getAllLogsJsonSchema,
  deleteLogsJsonSchema,
} from "./log.schema";
import { authorize } from "../../middlewares/authenticate";

export const logRoutes = async (app: FastifyInstance) => {
  app.get(
    "/",
    {
      schema: {
        ...getAllLogsJsonSchema,
        tags: ["Logs"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("DEVELOPER")],
    },
    getAllLogs
  );

  app.get(
    "/errors",
    {
      schema: {
        tags: ["Logs"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("DEVELOPER")],
    },
    getErrors
  );

  app.delete(
    "/",
    {
      schema: {
        ...deleteLogsJsonSchema,
        tags: ["Logs"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("DEVELOPER")],
    },
    clearAllLogs
  );

  app.delete(
    "/old",
    {
      schema: {
        tags: ["Logs"],
        security: [{ bearerAuth: [] }],
        querystring: {
          type: "object",
          properties: {
            days: { type: "number" },
          },
        },
      },
      preHandler: [authorize("DEVELOPER")],
    },
    clearOldLogs
  );
};