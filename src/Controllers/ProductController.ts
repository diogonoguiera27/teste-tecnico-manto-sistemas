import { Request, Response } from "express";
import { createProductsService } from "../Services/Product/createProductsService";
import { deleteProductsService } from "../Services/Product/deleteProductsService";
import { getAllProductsService } from "../Services/Product/getAllProductsService";
import { updateProductsService } from "../Services/Product/updateProductsService";
import { getAllByProductsService } from "..//Services/Product/getAllByProductsService";


export default class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { name, price, stock } = req.body;

      if (!name || !price || stock == null) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const product = await createProductsService(name, price, stock);
      return res.status(201).json(product);
    } catch (error) {
      console.error("Error creating Product:", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await getAllProductsService();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  async getAllById( req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const products = await getAllByProductsService(id);
      return res.json(products);
    } catch (error) {
      console.error("Error ao busca usuario:", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, price, stock } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      if (!name || isNaN(price) || isNaN(stock)) {
        return res.status(400).json({
          error: "All fields name, price, stock are required and must be valid",
        });
      }

      const updated = await updateProductsService(id, name, price, stock);
      return res.json(updated);
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      await deleteProductsService(id);
      return res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
}
