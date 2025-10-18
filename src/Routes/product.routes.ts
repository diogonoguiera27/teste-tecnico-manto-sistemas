import { Router } from "express";
import ProductController from "../Controllers/ProductController";


export const productRouter = Router();
const productController = new ProductController();

productRouter.post("/", productController.create.bind(productController));
productRouter.get("/", productController.getAll.bind(productController));
productRouter.get("/:id", productController.getAllById.bind(productController));
productRouter.put("/:id", productController.update.bind(productController));
productRouter.delete("/:id", productController.delete.bind(productController));

export default productRouter;


// C: CREATE  | POST 
// R: READ | GET
// u: UPDATE | PUT | PATCH 
// D: DELETE | DELETE 
