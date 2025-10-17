import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export const productRouter = Router();
const prisma = new PrismaClient();

productRouter.post("/", async (req, res) => {
  try {
    const { name, price, stock,  } = req.body;

    if (!name || !price || stock == null ) {
      return res.status(400).json({ error: "All fildes are required" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: Number(stock),
      },
    });

    res.status(201).json(product)
  } catch (error) {
    console.log("Error creating Produtc:", error);
    res.status(500).json({error: "Internal Server error"})
  }
});

productRouter.get("/", async (req, res)=>{
    try {
        const products = await prisma.product.findMany();
        res.json(products)
    } catch (error) {
        res.status(500).json({error: "Iternal server error"});
    }
})

productRouter.put("/:id", async (req, res) =>{
    try {
        const id = Number(req.params.id)
        const {name ,price , stock} = req.body;

        if(isNaN(id)) {
            return res.status(400).json({error: "Invalid ID"})
        }

       if (!name || isNaN(price)|| isNaN(stock)) {
        return res 
        .status(400)
        .json({error: "All fields name , price , stock are required and must be valid"})
       }      

        const updated = await prisma.product.update({
            where: {id},
            data: {name,price: parseFloat(price), stock:Number(stock)},
        });

        res.json(updated)
    } catch (error) {
        res.status(500).json({error: "Internal Server error"});
    }
})

productRouter.delete("/:id", async (req, res)=>{
    try {
        const id = Number(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({error: "Invalid ID"})
        }

        await prisma.product.delete({where: {id}});
        res.json({message: "Product deleted Successfuly"})
    } catch (error) {
        res.status(500).json({error: "Iternal Server error"})
    }
})

