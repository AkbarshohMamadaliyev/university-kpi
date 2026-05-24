import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(2).optional(),
});

const departmentProperties = {
  id: { type: "number" },
  name: { type: "string" },
  email: { type: "string" },
  createdAt: { type: "string" },
};

export const createDepartmentJsonSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: departmentProperties },
      },
    },
  },
};

export const updateDepartmentJsonSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string" } },
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: departmentProperties },
      },
    },
  },
};

export const getDepartmentJsonSchema = {
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
        data: { type: "object", properties: departmentProperties },
      },
    },
  },
};

export const getAllDepartmentsJsonSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "array",
          items: { type: "object", properties: departmentProperties },
        },
      },
    },
  },
};