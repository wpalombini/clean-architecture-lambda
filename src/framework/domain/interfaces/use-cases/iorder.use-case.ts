import { OrderDto } from '@domain/dtos/order.dto';

export interface IOrderUseCase {
  getAll(): Promise<OrderDto[]>;
  create(order: OrderDto): Promise<OrderDto>;
}
