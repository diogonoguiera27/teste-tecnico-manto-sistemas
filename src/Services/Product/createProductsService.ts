import { ProductRepository } from "../../Repository/ProductRepository";


const productRepository = new ProductRepository();

export async function createProductsService(name: string, price: number, stock: number) {
  return productRepository.create(name, parseFloat(price as any), Number(stock));
}
