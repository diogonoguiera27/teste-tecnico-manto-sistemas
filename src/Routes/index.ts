import { Router } from "express";
import { productRouter } from "./product.routes";
import { orderRouter } from "./order.routes";
import { authRouter } from "./auth.routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { cepRouter } from "./cep.routes";


const routes = Router();

routes.use("/cep", cepRouter)
routes.use("/auth" , authRouter)
routes.use("/products", authMiddleware, productRouter)
routes.use("/orders", authMiddleware, orderRouter)

export default routes