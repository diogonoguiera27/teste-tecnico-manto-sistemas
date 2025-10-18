import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderRepository {
  async create(userId: number, productId: number, quantity: number) {
    return prisma.order.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }

  async findAll() {
    return prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        product: { select: { id: true, name: true, price: true } },
      },
    });
  }

  async findByUser(userId: number) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        product: { select: { id: true, name: true, price: true } },
      },
    });
  }
}
