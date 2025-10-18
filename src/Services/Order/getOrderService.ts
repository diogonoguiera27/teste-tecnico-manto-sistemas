import { OrderRepository } from "../../Repository/OrderRepository";


const orderRepository = new OrderRepository();

export async function getAllOrdersService() {
  return orderRepository.findAll();
}
