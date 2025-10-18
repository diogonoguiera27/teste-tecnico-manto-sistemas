import { OrderRepository } from "../../Repository/OrderRepository";


const orderRepository = new OrderRepository();

export async function createOrderService(userId: number, productId: number, quantity: number) {
  return orderRepository.create(userId, productId, quantity);
}
