import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { Teacher } from "../modules/teacher/teacher.model";
import { Department } from "../modules/department/department.model";
import { Inspector } from "../modules/inspector/inspector.model";
import { Kpi } from "../modules/kpi/kpi.model";
import { Log } from "../modules/log/log.model";

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  models: [Teacher, Department, Inspector, Kpi, Log],
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};