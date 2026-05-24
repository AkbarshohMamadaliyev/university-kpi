export interface CreateTeacherDto {
  fullName: string;
  email: string;
  password: string;
  position: string;
  departmentId: number;
}

export interface UpdateTeacherDto {
  fullName?: string;
  position?: string;
  departmentId?: number;
}

export interface TeacherResponseDto {
  id: number;
  fullName: string;
  email: string;
  position: string;
  departmentId: number;
  createdAt: Date;
}