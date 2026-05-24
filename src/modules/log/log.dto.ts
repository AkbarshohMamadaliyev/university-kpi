export interface LogFilterDto {
  level?: "INFO" | "WARN" | "ERROR" | "DEBUG";
  from?: string;
  to?: string;
  url?: string;
  userId?: number;
  page?: number;
  limit?: number;
}