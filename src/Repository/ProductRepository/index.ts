import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  async create(name: string, price: number, stock: number) {
    return prisma.product.create({
      data: {
        name,
        price,
        stock,
      },
    });
  }

  async findAll() {
    return prisma.product.findMany();
  }

  async findById(id: number) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, name: string, price: number, stock: number) {
    return prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
      },
    });
  }

  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
