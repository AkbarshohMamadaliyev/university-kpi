import { FastifyRequest, FastifyReply } from "fastify";
import { InspectorService } from "./inspector.service";
import { createInspectorSchema, updateInspectorSchema } from "./inspector.schema";
import { CreateInspectorDto, UpdateInspectorDto } from "./inspector.dto";
import { sendSuccess, sendError } from "../../utils/response";

const inspectorService = new InspectorService();

export const getAllInspectors = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const inspectors = await inspectorService.getAll();
    return sendSuccess(reply, inspectors);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const getInspectorById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const inspector = await inspectorService.getById(Number(request.params.id));
    return sendSuccess(reply, inspector);
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};

export const createInspector = async (
  request: FastifyRequest<{ Body: CreateInspectorDto }>,
  reply: FastifyReply
) => {
  const parsed = createInspectorSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const inspector = await inspectorService.create(parsed.data);
    return sendSuccess(reply, inspector, "Inspector created successfully", 201);
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const updateInspector = async (
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateInspectorDto }>,
  reply: FastifyReply
) => {
  const parsed = updateInspectorSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const inspector = await inspectorService.update(
      Number(request.params.id),
      parsed.data
    );
    return sendSuccess(reply, inspector, "Inspector updated successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const deleteInspector = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const result = await inspectorService.delete(Number(request.params.id));
    return sendSuccess(reply, result, "Inspector deleted successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};