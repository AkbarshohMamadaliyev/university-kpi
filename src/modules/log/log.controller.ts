import { FastifyRequest, FastifyReply } from "fastify";
import { LogService } from "./log.service";
import { LogFilterDto } from "./log.dto";
import { sendSuccess, sendError } from "../../utils/response";

const logService = new LogService();

export const getAllLogs = async (
  request: FastifyRequest<{ Querystring: LogFilterDto }>,
  reply: FastifyReply
) => {
  try {
    const logs = await logService.getAll(request.query);
    return sendSuccess(reply, logs);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const getErrors = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const logs = await logService.getErrors();
    return sendSuccess(reply, logs);
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const clearAllLogs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await logService.clearAll();
    return sendSuccess(reply, result, "All logs cleared successfully");
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};

export const clearOldLogs = async (
  request: FastifyRequest<{ Querystring: { days: number } }>,
  reply: FastifyReply
) => {
  try {
    const days = request.query.days || 30;
    const result = await logService.clearOld(days);
    return sendSuccess(
      reply,
      result,
      `Logs older than ${days} days cleared successfully`
    );
  } catch (error: any) {
    return sendError(reply, error.message);
  }
};