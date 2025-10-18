import { OrderRepository } from "../../Repository/OrderRepository";


const orderRepository = new OrderRepository();

export async function getOrdersByUserService(userId: number) {
  return orderRepository.findByUser(userId);
}
