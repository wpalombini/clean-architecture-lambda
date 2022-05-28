import { inject, injectable } from 'tsyringe';
import { TYPES } from '@domain/types';
import { OrderDto } from '@domain/dtos/order.dto';
import { Order } from '@domain/entities/order';
import { IOrderMapper } from '@domain/interfaces/mappers/iorder.mapper';
import { IOrderRepository } from '@domain/interfaces/repositories/iorder.repository';
import { IOrderUseCase } from '@domain/interfaces/use-cases/iorder.use-case';

@injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    @inject(TYPES.IOrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.IMapper) private mapper: IOrderMapper
  ) {}

  public async getAll(): Promise<OrderDto[]> {
    const entities = await this.orderRepository.getAll();

    const result = entities.map((order: Order) => this.mapper.entityToDto(order));

    return result;
  }

  public async create(order: OrderDto): Promise<OrderDto> {
    const entity = this.mapper.dtoToEntity(order);

    const savedEntity = await this.orderRepository.create(entity);

    return this.mapper.entityToDto(savedEntity);
  }
}
