
import bcrypt from "bcryptjs";
import { AuthRepository } from "../../Repository/AuthRepository";

const authRepository = new AuthRepository();

export async function registerUserService(name: string, email: string, password: string) {
  const userExists = await authRepository.findUserByEmail(email);

  if (userExists) {
    return {
      status: 400,
      body: { error: "E-mail ja Cadastrado" },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser(name, email, hashedPassword);

  return {
    status: 201,
    body: {
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  };
}
