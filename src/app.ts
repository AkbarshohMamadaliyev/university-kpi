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

  // Routes
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(teacherRoutes, { prefix: "/api/teachers" });
  await app.register(departmentRoutes, { prefix: "/api/departments" });
  await app.register(inspectorRoutes, { prefix: "/api/inspectors" });
  await app.register(kpiRoutes, { prefix: "/api/kpis" });

  app.get("/health", async () => ({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  }));

  return app;
};