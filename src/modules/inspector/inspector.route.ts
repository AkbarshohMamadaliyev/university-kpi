import { FastifyInstance } from "fastify";
import {
  getAllInspectors,
  getInspectorById,
  createInspector,
  updateInspector,
  deleteInspector,
} from "./inspector.controller";
import {
  getAllInspectorsJsonSchema,
  getInspectorJsonSchema,
  createInspectorJsonSchema,
  updateInspectorJsonSchema,
} from "./inspector.schema";
import { authorize } from "../../middlewares/authenticate";

export const inspectorRoutes = async (app: FastifyInstance) => {
  // Faqat INSPECTOR ko'ra oladi
  app.get(
    "/",
    {
      schema: {
        ...getAllInspectorsJsonSchema,
        tags: ["Inspector"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    getAllInspectors
  );

  app.get(
    "/:id",
    {
      schema: {
        ...getInspectorJsonSchema,
        tags: ["Inspector"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    getInspectorById
  );

  // Faqat INSPECTOR yarata oladi
  app.post(
    "/",
    {
      schema: {
        ...createInspectorJsonSchema,
        tags: ["Inspector"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    createInspector
  );

  // Faqat INSPECTOR update qila oladi
  app.put(
    "/:id",
    {
      schema: {
        ...updateInspectorJsonSchema,
        tags: ["Inspector"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    updateInspector
  );

  // Faqat INSPECTOR o'chira oladi
  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Inspector"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    deleteInspector
  );
};