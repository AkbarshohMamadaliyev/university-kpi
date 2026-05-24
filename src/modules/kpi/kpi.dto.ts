export interface CreateKpiDto {
  title: string;
  description?: string;
  score: number;
  maxScore: number;
  evidence?: string;
  teacherId: number;
}

export interface UpdateKpiDto {
  title?: string;
  description?: string;
  score?: number;
  maxScore?: number;
  evidence?: string;
}

export interface ReviewKpiDto {
  status: "APPROVED" | "REJECTED";
  reviewNote?: string;
}