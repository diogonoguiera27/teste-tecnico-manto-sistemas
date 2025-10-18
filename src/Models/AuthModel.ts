import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IRequestCreateUser {
  name: string;
  email: string;
  password:string;
}

interface IRequestFindyUserByEmail {
  email:string
}

export class AuthModel {
  async findUserByEmail({email}:IRequestFindyUserByEmail) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser({name, email, password}:IRequestCreateUser) {
    return prisma.user.create({
      data: { name, email, password },
    });
  }
}
