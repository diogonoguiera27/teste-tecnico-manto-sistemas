import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Router } from "express";

export const orderRouter = Router();
const prisma = new PrismaClient();


orderRouter.post("/", async (req, res)=>{
    try {
        const { userId , productId,quantity} = req.body

        if (!userId || !productId || !quantity){
            return res.status(400).json({error:"UserId productId e quantity sao obrigatorios"})
        }

    const user = await prisma.user.findUnique({where: {id:userId}});
    if (!user) {
        return res.status(404).json({error:"usuario nao encontrao"})
    }

    const product = await prisma.product.findUnique({where: {id:productId}})
    if (!product) {
        return res.status(404).json({error:"Produto nao encontrado"})
    }

    if (product.stock < quantity){
        return res.status(400).json({error:"Estoque insuficiente"})
    }

    const order = await prisma.order.create({
        data: {
            userId,
            productId,
            quantity,
        }
    });

    await prisma.product.update({
        where: {id: productId},
        data: {stock: product.stock - quantity}
    })

    res.status(201).json({
      message: "Pedido criado com sucesso!",
      order,
    });
    } catch (error) {
        console.error("Erro ao Criar Pedido", error)
        res.status(500).json({error: "Error Interno no Servidor "})
    }
})

orderRouter.get("/",async (req , res )=>{
    try {
       const orders = await prisma.order.findMany({
        include: {
            user:{select:{id:true, name:true, email:true}},
            product: {select: {id:true, name:true, price:true}}
        }
       })
       res.json(orders)
    } catch (error) {
        console.error("Erro ao listar pedidos:", error);
       res.status(500).json({error: "Error Internio no Servidor"}) 
    }
})

orderRouter.get("/user/:userId", async (req ,res)=>{
    try {
        const userId = Number(req.params.userId)

        if (isNaN(userId)) {
            return res.status(400).json({error: "Id de usuario Inalido"})
        }

        const user  = await prisma.user.findUnique({where: {id: userId}})
        if (!user){
            return res.status(404).json({error:"Usuario nao encontrado"})
        }

        const orders = await prisma.order.findMany({
            where: {userId},
            include: {
                product: { select: {id:true, name:true, price:true}}
            },
        });

        res.json({user:{id: user.id , name:user.name, email:user.email},orders})
    } catch (error) {
        console.error("Erro ao consultar pedidos por usuário:", error);
        res.status(500).json({error: "Erro interno no servidor"})
    }
})


