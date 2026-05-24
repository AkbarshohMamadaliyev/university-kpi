import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  position: z.string().optional(),
  departmentId: z.number().optional(),
  role: z.enum(["TEACHER", "DEPARTMENT", "INSPECTOR", "DEVELOPER"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["TEACHER", "DEPARTMENT", "INSPECTOR", "DEVELOPER"]),
});

export const registerJsonSchema = {
  body: {
    type: "object",
    required: ["fullName", "email", "password", "role"],
    properties: {
      fullName: { type: "string", minLength: 2 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
      position: { type: "string" },
      departmentId: { type: "number" },
      role: {
        type: "string",
        enum: ["TEACHER", "DEPARTMENT", "INSPECTOR", "DEVELOPER"],
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
                fullName: { type: "string" },
                role: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

export const loginJsonSchema = {
  body: {
    type: "object",
    required: ["email", "password", "role"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
      role: {
        type: "string",
        enum: ["TEACHER", "DEPARTMENT", "INSPECTOR", "DEVELOPER"],
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
                fullName: { type: "string" },
                role: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};