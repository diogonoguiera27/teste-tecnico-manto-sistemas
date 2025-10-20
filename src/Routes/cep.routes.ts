import { Router } from "express";
import CepController from "../Controllers/CepController";


 const cepRouter: Router = Router();
const cepController = new CepController();

cepRouter.get("/:cep", cepController.getCep.bind(cepController));

export default cepRouter;
