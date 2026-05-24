import "dotenv/config";
import "./types";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt";
import swaggerPlugin from "./plugins/swagger";
import { connectDB } from "./config/database";
import { authRoutes } from "./modules/auth/auth.route";
import { teacherRoutes } from "./modules/teacher/teacher.route";
import { departmentRoutes } from "./modules/department/department.route";
import { inspectorRoutes } from "./modules/inspector/inspector.route";
import { kpiRoutes } from "./modules/kpi/kpi.route";
import { logRoutes } from "./modules/log/log.route";
import { saveLog } from "./utils/logger";
import { LogLevel } from "./modules/log/log.model";

export const buildApp = async () => {
  const app = Fastify({
    logger: {
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
    },
  });

  await connectDB();

  await app.register(cors, { origin: true });
  await app.register(swaggerPlugin);
  await app.register(jwtPlugin);

  // Request logger hook
  app.addHook("onResponse", async (request, reply) => {
    const user = request.user as any;
    const level = reply.statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO;

    await saveLog({
      level,
      message: `${request.method} ${request.url} ${reply.statusCode}`,
      userId: user?.id,
      role: user?.role,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      responseTime: reply.elapsedTime,
    });
  });

  // Routes
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(teacherRoutes, { prefix: "/api/teachers" });
  await app.register(departmentRoutes, { prefix: "/api/departments" });
  await app.register(inspectorRoutes, { prefix: "/api/inspectors" });
  await app.register(kpiRoutes, { prefix: "/api/kpis" });
  await app.register(logRoutes, { prefix: "/api/logs" });

  app.get("/health", async () => ({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  }));

  return app;
};