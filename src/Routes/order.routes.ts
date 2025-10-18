import { Router } from "express";
import OrderController from "../Controllers/Order";


export const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post("/", orderController.create.bind(orderController));
orderRouter.get("/", orderController.getAll.bind(orderController));
orderRouter.get("/user/:userId", orderController.getByUser.bind(orderController));

export default orderRouter;
