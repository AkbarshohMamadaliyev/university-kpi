const logProperties = {
  id: { type: "number" },
  level: { type: "string", enum: ["INFO", "WARN", "ERROR", "DEBUG"] },
  message: { type: "string" },
  userId: { type: "number" },
  role: { type: "string" },
  method: { type: "string" },
  url: { type: "string" },
  statusCode: { type: "number" },
  responseTime: { type: "number" },
  meta: { type: "object" },
  createdAt: { type: "string" },
};

export const getAllLogsJsonSchema = {
  querystring: {
    type: "object",
    properties: {
      level: { type: "string", enum: ["INFO", "WARN", "ERROR", "DEBUG"] },
      from: { type: "string" },
      to: { type: "string" },
      url: { type: "string" },
      userId: { type: "number" },
      page: { type: "number" },
      limit: { type: "number" },
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
            logs: {
              type: "array",
              items: { type: "object", properties: logProperties },
            },
            total: { type: "number" },
            page: { type: "number" },
            limit: { type: "number" },
          },
        },
      },
    },
  },
};

export const deleteLogsJsonSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: { type: "object" },
      },
    },
  },
};