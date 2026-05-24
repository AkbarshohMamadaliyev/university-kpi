export interface CreateInspectorDto {
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateInspectorDto {
  fullName?: string;
}

export interface InspectorResponseDto {
  id: number;
  fullName: string;
  email: string;
  createdAt: Date;
}