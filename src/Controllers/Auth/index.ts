import { Request, Response } from "express";
import { loginUserService } from "../../Services/auth/postAuthLoginService";
import { registerUserService } from "../../Services/auth/postAuthRegisterService";


export default class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(404)
          .json({ error: "Todos os campos são Obrigatorios" });
      }

      const result = await registerUserService(name, email, password);
      return res.status(result.status).json(result.body);
    } catch (error) {
      console.error("Erro no registro", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "E-mail e senha sao obrigatorios" });
      }

      const result = await loginUserService(email, password);
      return res.status(result.status).json(result.body);
    } catch (error) {
      console.error("Erro no login", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
