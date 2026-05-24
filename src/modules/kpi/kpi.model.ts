import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Teacher } from "../teacher/teacher.model";

export enum KpiStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Table({ tableName: "kpis" })
export class Kpi extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  score: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  maxScore: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  evidence: string;

  @Column({
    type: DataType.ENUM(...Object.values(KpiStatus)),
    defaultValue: KpiStatus.PENDING,
  })
  status: KpiStatus;

  @Column({ type: DataType.TEXT, allowNull: true })
  reviewNote: string;

  @ForeignKey(() => Teacher)
  @Column(DataType.INTEGER)
  teacherId: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}