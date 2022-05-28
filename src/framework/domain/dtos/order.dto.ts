import { IDto } from '@domain/interfaces/dtos/idto';

export class OrderDto implements IDto {
  public id: string;
  public description: string;
}
