import { OrderRepository } from "../../Repository/OrderRepository";

const orderRepository = new OrderRepository();

export async function updateOrderService(id: number, productId: number, quantity: number) {
  return orderRepository.update(id, Number(productId), Number(quantity));
}
