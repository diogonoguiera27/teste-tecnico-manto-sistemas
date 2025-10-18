
import { AuthModel } from "../Models/AuthModel";

const authModel = new AuthModel();

export class AuthRepository {
  async findUserByEmail(email: string) {
    return authModel.findUserByEmail({email})
  }

  async createUser(name: string, email: string, password: string) {
    return authModel.createUser({name , email, password})
  }
}
