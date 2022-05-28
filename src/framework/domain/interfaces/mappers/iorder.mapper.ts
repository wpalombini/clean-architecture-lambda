import { OrderDto } from '@domain/dtos/order.dto';
import { Order } from '@domain/entities/order';
import { IMapper } from '@domain/interfaces/mappers/imapper';

export interface IOrderMapper extends IMapper<Order, OrderDto> {}
