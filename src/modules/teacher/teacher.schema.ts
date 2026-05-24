import { z } from "zod";

export const createTeacherSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  position: z.string().min(2),
  departmentId: z.number(),
});

export const updateTeacherSchema = z.object({
  fullName: z.string().min(2).optional(),
  position: z.string().min(2).optional(),
  departmentId: z.number().optional(),
});

const teacherProperties = {
  id: { type: "number" },
  fullName: { type: "string" },
  email: { type: "string" },
  position: { type: "string" },
  departmentId: { type: "number" },
  createdAt: { type: "string" },
};

export const createTeacherJsonSchema = {
  body: {
    type: "object",
    required: ["fullName", "email", "password", "position", "departmentId"],
    properties: {
      fullName: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
      position: { type: "string" },
      departmentId: { type: "number" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: teacherProperties },
      },
    },
  },
};

export const updateTeacherJsonSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string" } },
  },
  body: {
    type: "object",
    properties: {
      fullName: { type: "string" },
      position: { type: "string" },
      departmentId: { type: "number" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: teacherProperties },
      },
    },
  },
};

export const getTeacherJsonSchema = {
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
        data: { type: "object", properties: teacherProperties },
      },
    },
  },
};

export const getAllTeachersJsonSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "array",
          items: { type: "object", properties: teacherProperties },
        },
      },
    },
  },
};