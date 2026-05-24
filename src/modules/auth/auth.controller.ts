import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import { RegisterDto, LoginDto } from "./auth.dto";
import { sendSuccess, sendError } from "../../utils/response";

const authService = new AuthService();

export const register = async (
  request: FastifyRequest<{ Body: RegisterDto }>,
  reply: FastifyReply
) => {
  const parsed = registerSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const user = await authService.register(parsed.data);
    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return sendSuccess(reply, { token, user }, "Registered successfully", 201);
  } catch (error: any) {
    return sendError(reply, error.message, 400);
  }
};

export const login = async (
  request: FastifyRequest<{ Body: LoginDto }>,
  reply: FastifyReply
) => {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) {
    return sendError(reply, "Validation error", 400, parsed.error.format());
  }

  try {
    const user = await authService.login(parsed.data);
    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return sendSuccess(reply, { token, user }, "Login successful");
  } catch (error: any) {
    return sendError(reply, error.message, 401);
  }
};