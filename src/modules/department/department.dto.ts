export interface CreateDepartmentDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateDepartmentDto {
  name?: string;
}

export interface DepartmentResponseDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}