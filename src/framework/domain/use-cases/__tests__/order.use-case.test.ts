import { IOrderMapper } from '@domain/interfaces/mappers/iorder.mapper';
import { IOrderRepository } from '@domain/interfaces/repositories/iorder.repository';
import { IOrderUseCase } from '@domain/interfaces/use-cases/iorder.use-case';
import { OrderMapper } from '@domain/mappers/order.mapper';
import { OrderRepository } from '@infra/repositories/order.repository';
import { OrderUseCase } from '@domain/use-cases/order.use-case';
import { Order } from '@domain/entities/order';
import { OrderDto } from '@domain/dtos/order.dto';

jest.mock('@infra/repositories/order.repository');

describe('OrderUseCase', () => {
  let orderRep: IOrderRepository;
  let orderMapper: IOrderMapper;
  let orderUseCase: IOrderUseCase;

  beforeEach(() => {
    orderRep = new OrderRepository();
    orderMapper = new OrderMapper();
    orderUseCase = new OrderUseCase(orderRep, orderMapper);
  });

  describe('getAll', () => {
    test('should return an array of order dtos', async () => {
      // Arrange
      (orderRep.getAll as jest.Mock).mockResolvedValueOnce([
        { id: '111', description: 'desc 1111', createdAt: new Date(Date.now() - 5000) },
        { id: '222', description: 'desc 2222', createdAt: new Date(Date.now() - 7000) },
      ] as Order[]);

      // Act
      const result = await orderUseCase.getAll();

      // Assert
      expect(result).toEqual([
        { id: '111', description: 'desc 1111' },
        { id: '222', description: 'desc 2222' },
      ] as OrderDto[]);
    });
  });

  describe('create', () => {
    let now: number;
    let realDate: DateConstructor;

    beforeEach(() => {
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

    test('should create an Order successfully', async () => {
      // Arrange
      const mockId = now.toString();
      const mockCreatedAt = new Date(now);
      const mockOrderDto = { description: 'desc 1111' } as OrderDto;
      const mockOrderEntity = { description: 'desc 1111' } as Order;

      (orderRep.create as jest.Mock).mockResolvedValue({
        ...mockOrderDto,
        id: mockId,
        createdAt: mockCreatedAt,
      } as Order);

      // Act
      const result = await orderUseCase.create(mockOrderDto);

      // Assert
      expect(orderRep.create as jest.Mock).toHaveBeenCalledWith(mockOrderEntity);
      expect(result).toEqual({ ...mockOrderDto, id: now.toString() });
    });
  });
});
