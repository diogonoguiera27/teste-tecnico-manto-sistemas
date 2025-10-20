import { Router } from "express";
import AuthController from "../Controllers/AuthController";

const authRouter: Router = Router()
const authController = new AuthController();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));

export default authRouter;
