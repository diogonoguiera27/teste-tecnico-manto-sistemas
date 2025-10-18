import { Request, Response } from "express";
import { getCepService } from "../Services/cep/getCepService";


export default class CepController {
  async getCep(req: Request, res: Response) {
    try {
      const { cep } = req.params

      if (!cep || cep.length < 8) {
        return res.status(400).json({ error: "CEP inválido" });
      }
      
      const endereco = await getCepService(cep);

      if (!endereco || (endereco as any).error) {
        return res.status(404).json({ error: "CEP não encontrado" });
      }

      return res.json({
        cep: endereco.cep,
        logradouro: endereco.street,
        bairro: endereco.neighborhood,
        cidade: endereco.city,
        uf: endereco.state,
        ibge: endereco.ibge,
      });
    } catch (error: any) {
      console.error(" Erro ao consultar CEP:", error.message);
      return res.status(500).json({ error: "Erro interno ao consultar CEP" });
    }
  }
}
