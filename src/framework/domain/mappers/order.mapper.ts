import { OrderDto } from '@domain/dtos/order.dto';
import { Order } from '@domain/entities/order';
import { IOrderMapper } from '@domain/interfaces/mappers/iorder.mapper';

export class OrderMapper implements IOrderMapper {
  public entityToDto(entity: Order): OrderDto {
    const dto = new OrderDto();

    dto.id = entity.id;
    dto.description = entity.description;

    return dto;
  }

  public dtoToEntity(source: OrderDto): Order {
    const entity = new Order();

    entity.id = source.id;
    entity.description = source.description;

    return entity;
  }
}
