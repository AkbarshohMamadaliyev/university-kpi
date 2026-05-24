import { FastifyRequest, FastifyReply } from "fastify";
import { DepartmentService } from "./department.service";
import { createDepartmentSchema, updateDepartmentSchema } from "./department.schema";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./department.dto";
import { sendSuccess, sendError } from "../../utils/response";

const departmentService = new DepartmentService();

export const getAllDepartments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const departments = await departmentService.getAll();
    return sendSuccess(reply, departments);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const getDepartmentById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const department = await departmentService.getById(Number(request.params.id));
    return sendSuccess(reply, department);
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};

export const createDepartment = async (
  request: FastifyRequest<{ Body: CreateDepartmentDto }>,
  reply: FastifyReply
) => {
  const parsed = createDepartmentSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const department = await departmentService.create(parsed.data);
    return sendSuccess(reply, department, "Department created successfully", 201);
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const updateDepartment = async (
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateDepartmentDto }>,
  reply: FastifyReply
) => {
  const parsed = updateDepartmentSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const department = await departmentService.update(
      Number(request.params.id),
      parsed.data
    );
    return sendSuccess(reply, department, "Department updated successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const deleteDepartment = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const result = await departmentService.delete(Number(request.params.id));
    return sendSuccess(reply, result, "Department deleted successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};