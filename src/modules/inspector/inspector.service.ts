import bcrypt from "bcryptjs";
import { Inspector } from "./inspector.model";
import { CreateInspectorDto, UpdateInspectorDto } from "./inspector.dto";

export class InspectorService {
  async getAll() {
    return Inspector.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async getById(id: number) {
    const inspector = await Inspector.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!inspector) throw new Error("Inspector not found");
    return inspector;
  }

  async create(dto: CreateInspectorDto) {
    const existing = await Inspector.findOne({ where: { email: dto.email } });
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const inspector = await Inspector.create({
      ...dto,
      password: hashedPassword,
    });

    const { password, ...result } = inspector.toJSON();
    return result;
  }

  async update(id: number, dto: UpdateInspectorDto) {
    const inspector = await Inspector.findByPk(id);
    if (!inspector) throw new Error("Inspector not found");

    await inspector.update(dto);
    const { password, ...result } = inspector.toJSON();
    return result;
  }

  async delete(id: number) {
    const inspector = await Inspector.findByPk(id);
    if (!inspector) throw new Error("Inspector not found");

    await inspector.destroy();
    return { message: "Inspector deleted successfully" };
  }
}