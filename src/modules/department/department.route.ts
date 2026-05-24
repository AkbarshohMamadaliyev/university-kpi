import { FastifyInstance } from "fastify";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./department.controller";
import {
  getAllDepartmentsJsonSchema,
  getDepartmentJsonSchema,
  createDepartmentJsonSchema,
  updateDepartmentJsonSchema,
} from "./department.schema";
import { authorize } from "../../middlewares/authenticate";

export const departmentRoutes = async (app: FastifyInstance) => {
  // Barcha rollar ko'ra oladi
  app.get(
    "/",
    {
      schema: {
        ...getAllDepartmentsJsonSchema,
        tags: ["Department"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [app.authenticate],
    },
    getAllDepartments
  );

  app.get(
    "/:id",
    {
      schema: {
        ...getDepartmentJsonSchema,
        tags: ["Department"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [app.authenticate],
    },
    getDepartmentById
  );

  // Faqat INSPECTOR yarata oladi
  app.post(
    "/",
    {
      schema: {
        ...createDepartmentJsonSchema,
        tags: ["Department"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    createDepartment
  );

  // Faqat INSPECTOR update qila oladi
  app.put(
    "/:id",
    {
      schema: {
        ...updateDepartmentJsonSchema,
        tags: ["Department"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    updateDepartment
  );

  // Faqat INSPECTOR o'chira oladi
  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Department"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("INSPECTOR")],
    },
    deleteDepartment
  );
};