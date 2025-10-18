import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { createOrderService } from "../../Services/Order/createOrdersService";
import { getAllOrdersService } from "../../Services/Order/getOrderService";
import { getOrdersByUserService } from "../../Services/Order/getIdOrderService";

const prisma = new PrismaClient();

export default class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity) {
        return res.status(400).json({
          error: "UserId, productId e quantity são obrigatórios",
        });
      }

      // validações ficam no controller
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ error: "Estoque insuficiente" });
      }

      // service apenas faz as operações no banco
      const order = await createOrderService(userId, productId, quantity);

      // atualiza estoque
      await prisma.product.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      });

      return res.status(201).json({
        message: "Pedido criado com sucesso!",
        order,
      });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await getAllOrdersService();
      return res.json(orders);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuário inválido" });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const result = await getOrdersByUserService(userId);

      return res.json({
        user: { id: user.id, name: user.name, email: user.email },
        orders: result,
      });
    } catch (error) {
      console.error("Erro ao consultar pedidos por usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
