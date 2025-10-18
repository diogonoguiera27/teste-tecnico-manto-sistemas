import { ProductRepository } from "../../Repository/ProductRepository";
const productRepository = new ProductRepository();
export async function getAllByProductsService(id:number) {
  return productRepository.findById(id)
}