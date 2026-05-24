import { FastifyRequest, FastifyReply } from "fastify";
import { KpiService } from "./kpi.service";
import {
  createKpiSchema,
  updateKpiSchema,
  reviewKpiSchema,
} from "./kpi.schema";
import { CreateKpiDto, UpdateKpiDto, ReviewKpiDto } from "./kpi.dto";
import { sendSuccess, sendError } from "../../utils/response";

const kpiService = new KpiService();

export const getAllKpis = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const kpis = await kpiService.getAll();
    return sendSuccess(reply, kpis);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const getKpisByTeacher = async (
  request: FastifyRequest<{ Params: { teacherId: string } }>,
  reply: FastifyReply
) => {
  try {
    const kpis = await kpiService.getByTeacher(
      Number(request.params.teacherId)
    );
    return sendSuccess(reply, kpis);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const getKpiById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const kpi = await kpiService.getById(Number(request.params.id));
    return sendSuccess(reply, kpi);
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};

export const createKpi = async (
  request: FastifyRequest<{ Body: CreateKpiDto }>,
  reply: FastifyReply
) => {
  const parsed = createKpiSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const kpi = await kpiService.create(parsed.data);
    return sendSuccess(reply, kpi, "KPI created successfully", 201);
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const updateKpi = async (
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateKpiDto }>,
  reply: FastifyReply
) => {
  const parsed = updateKpiSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const kpi = await kpiService.update(
      Number(request.params.id),
      parsed.data
    );
    return sendSuccess(reply, kpi, "KPI updated successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const reviewKpi = async (
  request: FastifyRequest<{ Params: { id: string }; Body: ReviewKpiDto }>,
  reply: FastifyReply
) => {
  const parsed = reviewKpiSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const kpi = await kpiService.review(
      Number(request.params.id),
      parsed.data
    );
    return sendSuccess(reply, kpi, "KPI reviewed successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const deleteKpi = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const result = await kpiService.delete(Number(request.params.id));
    return sendSuccess(reply, result, "KPI deleted successfully");
  } catch (error: any) {
    return sendError(reply, error.message, 404);
  }
};