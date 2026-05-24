import { z } from "zod";

export const createInspectorSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateInspectorSchema = z.object({
  fullName: z.string().min(2).optional(),
});

const inspectorProperties = {
  id: { type: "number" },
  fullName: { type: "string" },
  email: { type: "string" },
  createdAt: { type: "string" },
};

export const createInspectorJsonSchema = {
  body: {
    type: "object",
    required: ["fullName", "email", "password"],
    properties: {
      fullName: { type: "string" },
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
        data: { type: "object", properties: inspectorProperties },
      },
    },
  },
};

export const updateInspectorJsonSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string" } },
  },
  body: {
    type: "object",
    properties: {
      fullName: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object", properties: inspectorProperties },
      },
    },
  },
};

export const getInspectorJsonSchema = {
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
        data: { type: "object", properties: inspectorProperties },
      },
    },
  },
};

export const getAllInspectorsJsonSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "array",
          items: { type: "object", properties: inspectorProperties },
        },
      },
    },
  },
};