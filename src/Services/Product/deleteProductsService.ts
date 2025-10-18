import { ProductRepository } from "../../Repository/ProductRepository";


const productRepository = new ProductRepository();

export async function deleteProductsService(id: number) {
  return productRepository.delete(id);
}
