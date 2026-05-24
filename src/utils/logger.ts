import pino from "pino";
import { Log, LogLevel } from "../modules/log/log.model";

export const logger = pino({
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

interface LogData {
  level: LogLevel;
  message: string;
  userId?: number;
  role?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  responseTime?: number;
  meta?: object;
}

export const saveLog = async (data: LogData) => {
  try {
    await Log.create({
      level: data.level,
      message: data.message,
      userId: data.userId,
      role: data.role,
      method: data.method,
      url: data.url,
      statusCode: data.statusCode,
      responseTime: data.responseTime,
      meta: data.meta,
    });
  } catch (err) {
    logger.error({ err }, "Failed to save log to database");
  }
};

export const logInfo = (
  message: string,
  data?: Omit<LogData, "level" | "message">,
) => {
  logger.info({ ...data }, message);
  saveLog({ level: LogLevel.INFO, message, ...data });
};

export const logError = (
  message: string,
  data?: Omit<LogData, "level" | "message">,
) => {
  logger.error({ ...data }, message);
  saveLog({ level: LogLevel.ERROR, message, ...data });
};

export const logWarn = (
  message: string,
  data?: Omit<LogData, "level" | "message">,
) => {
  logger.warn({ ...data }, message);
  saveLog({ level: LogLevel.WARN, message, ...data });
};
