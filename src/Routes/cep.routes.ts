import { Router } from "express";
import CepController from "../Controllers/Cep";


export const cepRouter = Router();
const cepController = new CepController();

cepRouter.get("/:cep", cepController.getCep.bind(cepController));

export default cepRouter;
