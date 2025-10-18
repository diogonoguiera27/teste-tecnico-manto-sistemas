import axios from "axios";

interface IRequestCep {
    cep:string
}

export class CepModel {

  async findByCep({cep}:IRequestCep) {

  const token = process.env.INVERTEXTO_API_KEY;

    const url = `https://api.invertexto.com/v1/cep/${cep}?token=${token}`;
    const response = await axios.get(url);
    return response.data;
  }
}
