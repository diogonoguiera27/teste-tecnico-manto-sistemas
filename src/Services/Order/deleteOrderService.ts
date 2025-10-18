import { OrderRepository } from "../../Repository/OrderRepository";



const orderRepository = new OrderRepository();

export async function deleteOrderService(id: number) {
  return orderRepository.delete(id);
}