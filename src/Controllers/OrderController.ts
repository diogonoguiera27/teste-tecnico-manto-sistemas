import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { createOrderService } from "../Services/Order/createOrdersService";
import { getAllOrdersService } from "../Services/Order/getOrderService";
import { getOrdersByUserService } from "../Services/Order/getIdOrderService";
import { deleteOrderService } from "../Services/Order/deleteOrderService";

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

      
      const order = await createOrderService(userId, productId, quantity);

      
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

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { quantity, productId } = req.body;

      if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

      const order = await prisma.order.findUnique({ where: { id } });
      if (!order) return res.status(404).json({ error: "Pedido não encontrado." });

      const product = await prisma.product.findUnique({ where: { id: productId || order.productId } });
      if (!product) return res.status(404).json({ error: "Produto não encontrado." });

      
      if (quantity && quantity !== order.quantity) {
        const diff = quantity - order.quantity;
        if (diff > 0 && product.stock < diff)
          return res.status(400).json({ error: "Estoque insuficiente para aumentar a quantidade." });

        await prisma.product.update({
          where: { id: product.id },
          data: { stock: product.stock - diff },
        });
      }

      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          quantity: quantity ?? order.quantity,
          productId: productId ?? order.productId,
        },
        include: { product: true, user: true },
      });

      return res.json({
        message: "Pedido atualizado com sucesso!",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }


  async delete(req: Request, res: Response) {
      try {
        const id = Number(req.params.id);
  
        if (isNaN(id)) {
          return res.status(400).json({ error: "ID inválido." });
        }
  
        await deleteOrderService(id);
        return res.json({ message: "Pedido Deletado com  successfully" });
      } catch (error) {
        console.error("Error ao deletar pedido:", error);
        return res.status(500).json({ error: "Error Interno no Servidor" });
      }
    }
}
