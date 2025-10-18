import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IRequestCreate{
    name: string;
    price: number;
    stock: number;
}

interface IRequestUpdate {
  id:number;
  name:string;
  price:number;
  stock:number;
}

export class ProductModel {
  async create({name, price, stock}: IRequestCreate) {
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

  async update({id,name,price,stock}:IRequestUpdate) {
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
