export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  position?: string;
  departmentId?: number;
  role: "TEACHER" | "DEPARTMENT" | "INSPECTOR";
}

export interface LoginDto {
  email: string;
  password: string;
  role: "TEACHER" | "DEPARTMENT" | "INSPECTOR";
}

export interface AuthResponseDto {
  token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
    role: string;
  };
}