import { FastifyInstance } from "fastify";
import {
  getAllKpis,
  getKpiById,
  getKpisByTeacher,
  createKpi,
  updateKpi,
  reviewKpi,
  deleteKpi,
} from "./kpi.controller";
import {
  getAllKpisJsonSchema,
  getKpiJsonSchema,
  createKpiJsonSchema,
  updateKpiJsonSchema,
  reviewKpiJsonSchema,
} from "./kpi.schema";
import { authorize } from "../../middlewares/authenticate";

export const kpiRoutes = async (app: FastifyInstance) => {
  app.get(
    "/",
    {
      schema: {
        ...getAllKpisJsonSchema,
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR", "DEPARTMENT")],
    },
    getAllKpis
  );

  app.get(
    "/teacher/:teacherId",
    {
      schema: {
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
        params: {
          type: "object",
          properties: { teacherId: { type: "string" } },
        },
      },
      preHandler: [app.authenticate],
    },
    getKpisByTeacher
  );

  app.get(
    "/:id",
    {
      schema: {
        ...getKpiJsonSchema,
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [app.authenticate],
    },
    getKpiById
  );

  app.post(
    "/",
    {
      schema: {
        ...createKpiJsonSchema,
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("TEACHER")],
    },
    createKpi
  );

  app.put(
    "/:id",
    {
      schema: {
        ...updateKpiJsonSchema,
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("TEACHER")],
    },
    updateKpi
  );

  app.patch(
    "/:id/review",
    {
      schema: {
        ...reviewKpiJsonSchema,
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    reviewKpi
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["KPI"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    deleteKpi
  );
};