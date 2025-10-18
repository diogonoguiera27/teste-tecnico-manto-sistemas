
import { OrderModel } from "../Models/OrderModel";


const orderModel = new OrderModel();

export class OrderRepository {
  async create(userId: number, productId: number, quantity: number) {
    return orderModel.create({userId ,productId , quantity})
  }

  async findAll() {
    return orderModel.findAll();
  }

  async findByUser(userId: number) {
    return orderModel.findByUser({userId})
  }

   async update(id: number, productId: number, quantity: number) {
    return orderModel.update({ id, productId, quantity });
  }

  
  async delete(id: number) {
    return orderModel.delete(id)
  }
}
