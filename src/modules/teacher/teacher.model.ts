import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Department } from "../department/department.model";

@Table({ tableName: "teachers" })
export class Teacher extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  position: string;

  @ForeignKey(() => Department)
  @Column(DataType.INTEGER)
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}