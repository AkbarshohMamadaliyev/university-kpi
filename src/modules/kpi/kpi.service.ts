import { Kpi, KpiStatus } from "./kpi.model";
import { Teacher } from "../teacher/teacher.model";
import { CreateKpiDto, UpdateKpiDto, ReviewKpiDto } from "./kpi.dto";

export class KpiService {
  async getAll() {
    return Kpi.findAll({
      include: [{ model: Teacher, attributes: ["id", "fullName", "position"] }],
    });
  }

  async getByTeacher(teacherId: number) {
    return Kpi.findAll({
      where: { teacherId },
      include: [{ model: Teacher, attributes: ["id", "fullName", "position"] }],
    });
  }

  async getById(id: number) {
    const kpi = await Kpi.findByPk(id, {
      include: [{ model: Teacher, attributes: ["id", "fullName", "position"] }],
    });
    if (!kpi) throw new Error("KPI not found");
    return kpi;
  }

  async create(dto: CreateKpiDto) {
    const teacher = await Teacher.findByPk(dto.teacherId);
    if (!teacher) throw new Error("Teacher not found");

    return Kpi.create({ ...dto, status: KpiStatus.PENDING });
  }

  async update(id: number, dto: UpdateKpiDto) {
    const kpi = await Kpi.findByPk(id);
    if (!kpi) throw new Error("KPI not found");

    if (kpi.status !== KpiStatus.PENDING) {
      throw new Error("Only PENDING KPIs can be updated");
    }

    await kpi.update(dto);
    return kpi;
  }

  async review(id: number, dto: ReviewKpiDto) {
    const kpi = await Kpi.findByPk(id);
    if (!kpi) throw new Error("KPI not found");

    if (kpi.status !== KpiStatus.PENDING) {
      throw new Error("Only PENDING KPIs can be reviewed");
    }

    await kpi.update({
      status: dto.status,
      reviewNote: dto.reviewNote,
    });
    return kpi;
  }

  async delete(id: number) {
    const kpi = await Kpi.findByPk(id);
    if (!kpi) throw new Error("KPI not found");

    await kpi.destroy();
    return { message: "KPI deleted successfully" };
  }
}