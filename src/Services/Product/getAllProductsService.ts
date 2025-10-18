import { ProductRepository } from "../../Repository/ProductRepository";
const productRepository = new ProductRepository();
export async function getAllProductsService() {
  return productRepository.findAll();
}