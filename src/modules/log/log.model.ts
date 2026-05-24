import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
} from "sequelize-typescript";

export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

@Table({ tableName: "logs", updatedAt: false })
export class Log extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(LogLevel)),
    allowNull: false,
  })
  level: LogLevel;

  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  meta: object;

  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  role: string;

  @Column({ type: DataType.STRING, allowNull: true })
  method: string;

  @Column({ type: DataType.STRING, allowNull: true })
  url: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  statusCode: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  responseTime: number;

  @CreatedAt
  createdAt: Date;
}