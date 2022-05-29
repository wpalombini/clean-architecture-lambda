import { Order } from '@domain/entities/order';
import { IOrderRepository } from '@domain/interfaces/repositories/iorder.repository';
import { OrderRepository } from '@infra/repositories/order.repository';

describe('OrderRepository', () => {
  let orderRep: IOrderRepository;

  let now: number;
  let realDate: DateConstructor;

  beforeEach(() => {
    orderRep = new OrderRepository();

    now = Date.now();
    realDate = Date;

    const currentDate = new Date(now);
    global.Date = class extends Date {
      constructor(date) {
        if (date) return super(date) as any;

        return currentDate;
      }
    } as any;
  });

  afterEach(() => {
    // cleanup
    global.Date = realDate;
  });

  describe('getAll', () => {
    test('should return an array of Orders', async () => {
      // Arrange
      // Needs to be properly mocked when replacing OrderRepository.getAll content by real implementation

      // Act
      const result = await orderRep.getAll();

      // Assert
      expect(result).toEqual<Order[]>([
        { id: '1', description: 'desc 1', createdAt: new Date(now - 10000) },
        { id: '2', description: 'desc 2', createdAt: new Date(now - 5000) },
      ] as Order[]);
    });
  });

  describe('create', () => {
    test('should create an Order successfully', async () => {
      // Arrange
      const order: Order = new Order();
      order.description = 'desc';

      // Act
      const result = await orderRep.create(order);

      // Assert
      expect(result).toEqual<Order>({
        id: now.toString(),
        description: 'desc',
        createdAt: new Date(now),
      } as Order);
    });
  });
});
