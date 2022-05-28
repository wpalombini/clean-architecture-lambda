import { injectable } from 'tsyringe';
import { Order } from '@domain/entities/order';
import { IOrderRepository } from '@domain/interfaces/repositories/iorder.repository';

@injectable()
export class OrderRepository implements IOrderRepository {
  public getAll(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      resolve([
        { id: '1', description: 'desc 1' },
        { id: '2', description: 'desc 2' },
      ] as Order[]);
      // reject(new Error('error X when fetching data'));
    });
  }

  public create(order: Order): Promise<Order> {
    const fakeId = Date.now().toString();
    return new Promise<Order>((resolve, reject) => {
      resolve({ ...order, id: fakeId, createdAt: new Date(Date.now()) } as Order);
    });
  }
}
