import axios from "axios";

export class CepRepository {
  async findByCep(cep: string, token: string) {
    const url = `https://api.invertexto.com/v1/cep/${cep}?token=${token}`;
    const response = await axios.get(url);
    return response.data;
  }
}
