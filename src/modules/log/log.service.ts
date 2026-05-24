import { Op } from "sequelize";
import { Log } from "./log.model";
import { LogFilterDto } from "./log.dto";

export class LogService {
  async getAll(filter: LogFilterDto) {
    const page = filter.page || 1;
    const limit = filter.limit || 20;
    const offset = (page - 1) * limit;

    const where: any = {};

    if (filter.level) {
      where.level = filter.level;
    }

    if (filter.url) {
      where.url = { [Op.iLike]: `%${filter.url}%` };
    }

    if (filter.userId) {
      where.userId = filter.userId;
    }

    if (filter.from || filter.to) {
      where.createdAt = {};
      if (filter.from) {
        where.createdAt[Op.gte] = new Date(filter.from);
      }
      if (filter.to) {
        where.createdAt[Op.lte] = new Date(filter.to);
      }
    }

    const { count, rows } = await Log.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      logs: rows,
      total: count,
      page,
      limit,
    };
  }

  async getErrors() {
    return Log.findAll({
      where: { level: "ERROR" },
      order: [["createdAt", "DESC"]],
      limit: 50,
    });
  }

  async clearAll() {
    const count = await Log.destroy({ where: {} });
    return { deleted: count };
  }

  async clearOld(days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);

    const count = await Log.destroy({
      where: {
        createdAt: { [Op.lt]: date },
      },
    });

    return { deleted: count };
  }
}