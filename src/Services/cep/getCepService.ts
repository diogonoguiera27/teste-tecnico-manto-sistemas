import { CepRepository } from "../../Repository/CepRepository";


const cepRepository = new CepRepository();

export async function getCepService(cep: string, token: string) {
  return cepRepository.findByCep(cep, token);
}
