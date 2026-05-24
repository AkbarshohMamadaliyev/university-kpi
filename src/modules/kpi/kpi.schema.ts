import { z } from "zod";

export const createKpiSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  score: z.number().min(0),
  maxScore: z.number().min(1),
  evidence: z.string().optional(),
  teacherId: z.number(),
});

export const updateKpiSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  score: z.number().min(0).optional(),
  maxScore: z.number().min(1).optional(),
  evidence: z.string().optional(),
});

export const reviewKpiSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  reviewNote: z.string().optional(),
});

const kpiProperties = {
  id: { type: "number" },
  title: { type: "string" },
  description: { type: "string" },
  score: { type: "number" },
  maxScore: { type: "number" },
  evidence: { type: "string" },
  status: { type: "string", enum: ["PENDING", "APPROVED", "REJECTED"] },
  reviewNote: { type: "string" },
  teacherId: { type: "number" },
  createdAt: { type: "string" },
};

export const createKpiJsonSchema = {
  body: {
    type: "object",
    required: ["title", "score", "maxScore", "teacherId"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      score: { type: "number" },
      maxScore: { type: "number" },
      evidence: { type: "string" },
      teacherId: { type: "number" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: kpiProperties },
      },
    },
  },
};

export const updateKpiJsonSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string" } },
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      score: { type: "number" },
      maxScore: { type: "number" },
      evidence: { type: "string" },
    },
  },
};

export const reviewKpiJsonSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string" } },
  },
  body: {
    type: "object",
    required: ["status"],
    properties: {
      status: { type: "string", enum: ["APPROVED", "REJECTED"] },
      reviewNote: { type: "string" },
    },
  },
};

export const getAllKpisJsonSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "array",
          items: { type: "object", properties: kpiProperties },
        },
      },
    },
  },
};

export const getKpiJsonSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string" } },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: kpiProperties },
      },
    },
  },
};