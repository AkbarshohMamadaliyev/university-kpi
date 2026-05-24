import { FastifyInstance } from "fastify";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "./teacher.controller";
import {
  getAllTeachersJsonSchema,
  getTeacherJsonSchema,
  createTeacherJsonSchema,
  updateTeacherJsonSchema,
} from "./teacher.schema";
import { authorize } from "../../middlewares/authenticate";

export const teacherRoutes = async (app: FastifyInstance) => {
  // Barcha rollar ko'ra oladi
  app.get(
    "/",
    {
      schema: {
        ...getAllTeachersJsonSchema,
        tags: ["Teacher"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [app.authenticate],
    },
    getAllTeachers
  );

  app.get(
    "/:id",
    {
      schema: {
        ...getTeacherJsonSchema,
        tags: ["Teacher"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [app.authenticate],
    },
    getTeacherById
  );

  // Faqat DEPARTMENT yarata oladi
  app.post(
    "/",
    {
      schema: {
        ...createTeacherJsonSchema,
        tags: ["Teacher"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("DEPARTMENT")],
    },
    createTeacher
  );

  // Faqat DEPARTMENT update qila oladi
  app.put(
    "/:id",
    {
      schema: {
        ...updateTeacherJsonSchema,
        tags: ["Teacher"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("DEPARTMENT")],
    },
    updateTeacher
  );

  // Faqat DEPARTMENT o'chira oladi
  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Teacher"],
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authorize("DEPARTMENT")],
    },
    deleteTeacher
  );
};