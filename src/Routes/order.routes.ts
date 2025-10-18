import { Router } from "express";
import OrderController from "../Controllers/OrderController";


export const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post("/", orderController.create.bind(orderController));
orderRouter.get("/", orderController.getAll.bind(orderController));
orderRouter.get("/user/:userId", orderController.getByUser.bind(orderController));
orderRouter.put("/:id", orderController.update.bind(orderController));
orderRouter.delete("/:id", orderController.delete.bind(orderController));

export default orderRouter;
