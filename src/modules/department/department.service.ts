import bcrypt from "bcryptjs";
import { Department } from "./department.model";
import { Teacher } from "../teacher/teacher.model";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./department.dto";

export class DepartmentService {
  async getAll() {
    return Department.findAll({
      include: [{ model: Teacher, attributes: ["id", "fullName", "position"] }],
      attributes: { exclude: ["password"] },
    });
  }

  async getById(id: number) {
    const department = await Department.findByPk(id, {
      include: [{ model: Teacher, attributes: ["id", "fullName", "position"] }],
      attributes: { exclude: ["password"] },
    });
    if (!department) throw new Error("Department not found");
    return department;
  }

  async create(dto: CreateDepartmentDto) {
    const existing = await Department.findOne({ where: { email: dto.email } });
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const department = await Department.create({
      ...dto,
      password: hashedPassword,
    });

    const { password, ...result } = department.toJSON();
    return result;
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    const department = await Department.findByPk(id);
    if (!department) throw new Error("Department not found");

    await department.update(dto);
    const { password, ...result } = department.toJSON();
    return result;
  }

  async delete(id: number) {
    const department = await Department.findByPk(id);
    if (!department) throw new Error("Department not found");

    await department.destroy();
    return { message: "Department deleted successfully" };
  }
}