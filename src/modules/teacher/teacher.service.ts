import { Teacher } from "./teacher.model";
import { Department } from "../department/department.model";
import { CreateTeacherDto, UpdateTeacherDto } from "./teacher.dto";
import bcrypt from "bcryptjs";

export class TeacherService {
  async getAll() {
    return Teacher.findAll({
      include: [{ model: Department, attributes: ["id", "name"] }],
      attributes: { exclude: ["password"] },
    });
  }

  async getById(id: number) {
    const teacher = await Teacher.findByPk(id, {
      include: [{ model: Department, attributes: ["id", "name"] }],
      attributes: { exclude: ["password"] },
    });
    if (!teacher) throw new Error("Teacher not found");
    return teacher;
  }

  async create(dto: CreateTeacherDto) {
    const existing = await Teacher.findOne({ where: { email: dto.email } });
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const teacher = await Teacher.create({ ...dto, password: hashedPassword });

    const { password, ...result } = teacher.toJSON();
    return result;
  }

  async update(id: number, dto: UpdateTeacherDto) {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) throw new Error("Teacher not found");

    await teacher.update(dto);
    const { password, ...result } = teacher.toJSON();
    return result;
  }

  async delete(id: number) {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) throw new Error("Teacher not found");

    await teacher.destroy();
    return { message: "Teacher deleted successfully" };
  }
}