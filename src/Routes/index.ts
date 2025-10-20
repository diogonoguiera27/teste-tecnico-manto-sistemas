import { Router } from "express";
import cepRouter from "./cep.routes";
import authRouter from "./auth.routes";
import { authMiddleware } from "src/middlewares/authMiddleware";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";



const routes: Router = Router();

routes.use("/cep", cepRouter)
routes.use("/auth" , authRouter)
routes.use("/products", authMiddleware, productRouter)
routes.use("/orders", authMiddleware, orderRouter)

export default routes