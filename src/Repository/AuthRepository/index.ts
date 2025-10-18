import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(name: string, email: string, password: string) {
    return prisma.user.create({
      data: { name, email, password },
    });
  }
}
