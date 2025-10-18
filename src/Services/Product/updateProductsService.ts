import { ProductRepository } from "../../Repository/ProductRepository";
const productRepository = new ProductRepository();

export async function updateProductsService(id: number, name: string, price: number, stock: number) {
  return productRepository.update(id, name, parseFloat(price as any), Number(stock));
}
