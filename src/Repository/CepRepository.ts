
import { CepModel } from "../Models/CepModel";

const cepModel = new CepModel();
export class CepRepository {

  async findByCep(cep: string) {
    return cepModel.findByCep({cep})
  }
}
