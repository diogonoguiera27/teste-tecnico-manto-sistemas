
import { ProductModel } from "../Models/ProductModel";
const productModel = new ProductModel();
export class ProductRepository {
  async create(name: string, price: number, stock: number) {
    return productModel.create({name, price, stock});
  }

  async findAll() {
    return productModel.findAll();
  }

  async findById(id: number) {
    return productModel.findById(id)
  }

  async update(id: number, name: string, price: number, stock: number) {
    return productModel.update({id, name, price, stock})
  }

  async delete(id: number) {
    return productModel.delete(id)
  }
}
