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
  HasMany,
} from "sequelize-typescript";
import { Teacher } from "../teacher/teacher.model";

@Table({ tableName: "departments" })
export class Department extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Teacher)
  teachers: Teacher[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}