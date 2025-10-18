import { CepRepository } from "../../Repository/CepRepository";


const cepRepository = new CepRepository();

export async function getCepService(cep: string ) {
  return cepRepository.findByCep(cep );
}
