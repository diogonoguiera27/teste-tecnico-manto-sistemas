import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IRequestCreateOrder {
  userId: number;
  productId: number;
  quantity: number;
}

interface IRequestUserId {
  userId: number
}

interface IRequestUpdateOrder {
  id: number;
  productId: number;
  quantity: number;
}


export class OrderModel {
  async create({userId, productId,  quantity }: IRequestCreateOrder) {
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

  async findByUser({userId}:IRequestUserId) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        product: { select: { id: true, name: true, price: true } },
      },
    });
  }

  async update({ id, productId, quantity }: IRequestUpdateOrder) {
    return prisma.order.update({
      where: { id },
      data: {
        productId,
        quantity,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        product: { select: { id: true, name: true, price: true } },
      },
    });
  }

  async delete(id: number) {
    return prisma.order.delete({
      where: { id },
    });
  }
}
