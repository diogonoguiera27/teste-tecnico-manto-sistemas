
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { AuthRepository } from "../../Repository/AuthRepository";

const authRepository = new AuthRepository();

export async function loginUserService(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    return {
      status: 404,
      body: { error: "usuario nao encontrado" },
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return {
      status: 401,
      body: { error: "senha incorreta" },
    };
  }

  const token = Jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || "secretkey123",
    { expiresIn: "2h" }
  );

  return {
    status: 200,
    body: { message: "Login realizado com sucesso", token },
  };
}