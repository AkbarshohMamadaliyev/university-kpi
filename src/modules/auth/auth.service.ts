import bcrypt from "bcryptjs";
import { Teacher } from "../teacher/teacher.model";
import { Department } from "../department/department.model";
import { Inspector } from "../inspector/inspector.model";
import { LoginDto, RegisterDto } from "./auth.dto";

export class AuthService {
  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    if (dto.role === "TEACHER") {
      const existing = await Teacher.findOne({ where: { email: dto.email } });
      if (existing) throw new Error("Email already exists");

      const teacher = await Teacher.create({
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
        position: dto.position || "Teacher",
        departmentId: dto.departmentId,
      });

      return {
        id: teacher.id,
        email: teacher.email,
        fullName: teacher.fullName,
        role: "TEACHER" as const,
      };
    }

    if (dto.role === "DEPARTMENT") {
      const existing = await Department.findOne({
        where: { email: dto.email },
      });
      if (existing) throw new Error("Email already exists");

      const department = await Department.create({
        fullName: dto.fullName,
        name: dto.fullName,
        email: dto.email,
        password: hashedPassword,
      });

      return {
        id: department.id,
        email: department.email,
        fullName: department.name,
        role: "DEPARTMENT" as const,
      };
    }

    if (dto.role === "INSPECTOR") {
      const existing = await Inspector.findOne({ where: { email: dto.email } });
      if (existing) throw new Error("Email already exists");

      const inspector = await Inspector.create({
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
      });

      return {
        id: inspector.id,
        email: inspector.email,
        fullName: inspector.fullName,
        role: "INSPECTOR" as const,
      };
    }

    if (dto.role === "DEVELOPER") {
      const existing = await Inspector.findOne({ where: { email: dto.email } });
      if (existing) throw new Error("Email already exists");

      const developer = await Inspector.create({
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
      });

      return {
        id: developer.id,
        email: developer.email,
        fullName: developer.fullName,
        role: "DEVELOPER" as const,
      };
    }

    throw new Error("Invalid role");
  }

  async login(dto: LoginDto) {
    if (dto.role === "TEACHER") {
      const teacher = await Teacher.findOne({ where: { email: dto.email } });
      if (!teacher) throw new Error("Invalid email or password");

      const isMatch = await bcrypt.compare(dto.password, teacher.password);
      if (!isMatch) throw new Error("Invalid email or password");

      return {
        id: teacher.id,
        email: teacher.email,
        fullName: teacher.fullName,
        role: "TEACHER" as const,
      };
    }

    if (dto.role === "DEPARTMENT") {
      const department = await Department.findOne({
        where: { email: dto.email },
      });
      if (!department) throw new Error("Invalid email or password");

      const isMatch = await bcrypt.compare(dto.password, department.password);
      if (!isMatch) throw new Error("Invalid email or password");

      return {
        id: department.id,
        email: department.email,
        fullName: department.name,
        role: "DEPARTMENT" as const,
      };
    }

    if (dto.role === "INSPECTOR") {
      const inspector = await Inspector.findOne({
        where: { email: dto.email },
      });
      if (!inspector) throw new Error("Invalid email or password");

      const isMatch = await bcrypt.compare(dto.password, inspector.password);
      if (!isMatch) throw new Error("Invalid email or password");

      return {
        id: inspector.id,
        email: inspector.email,
        fullName: inspector.fullName,
        role: "INSPECTOR" as const,
      };
    }

    if (dto.role === "DEVELOPER") {
      const developer = await Inspector.findOne({
        where: { email: dto.email },
      });
      if (!developer) throw new Error("Invalid email or password");

      const isMatch = await bcrypt.compare(dto.password, developer.password);
      if (!isMatch) throw new Error("Invalid email or password");

      return {
        id: developer.id,
        email: developer.email,
        fullName: developer.fullName,
        role: "DEVELOPER" as const,
      };
    }

    throw new Error("Invalid role");
  }
}