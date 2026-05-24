import { FastifyRequest, FastifyReply } from "fastify";
import { TeacherService } from "./teacher.service";
import { createTeacherSchema, updateTeacherSchema } from "./teacher.schema";
import { CreateTeacherDto, UpdateTeacherDto } from "./teacher.dto";
import { sendSuccess, sendError } from "../../utils/response";

const teacherService = new TeacherService();

export const getAllTeachers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const teachers = await teacherService.getAll();
    return sendSuccess(reply, teachers);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const getTeacherById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const teacher = await teacherService.getById(Number(request.params.id));
    return sendSuccess(reply, teacher);
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};

export const createTeacher = async (
  request: FastifyRequest<{ Body: CreateTeacherDto }>,
  reply: FastifyReply
) => {
  const parsed = createTeacherSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const teacher = await teacherService.create(parsed.data);
    return sendSuccess(reply, teacher, "Teacher created successfully", 201);
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const updateTeacher = async (
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateTeacherDto }>,
  reply: FastifyReply
) => {
  const parsed = updateTeacherSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const teacher = await teacherService.update(
      Number(request.params.id),
      parsed.data
    );
    return sendSuccess(reply, teacher, "Teacher updated successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const deleteTeacher = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const result = await teacherService.delete(Number(request.params.id));
    return sendSuccess(reply, result, "Teacher deleted successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};