import { Order } from '@domain/entities/order';

export interface IOrderRepository {
  getAll(): Promise<Order[]>;
  create(order: Order): Promise<Order>;
}
